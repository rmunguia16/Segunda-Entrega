import express from 'express';
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js"; 
import { engine } from 'express-handlebars';
import __dirname from "./utils.js";
import path from 'path';
import { Server } from 'socket.io';
import PM from '../productManager.js';
import mongoose from 'mongoose';

const pm = new PM.ProductManager(path.resolve(__dirname, '../products.json'));
const PORT = 4000;
const uri = "mongodb+srv://rulink:coderhouse@cluster0.qa4tn25.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

mongoose.connect(uri)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e));


const app = express();
const server = app.listen(PORT, () => {console.log(`\nServidor escuchando en http://localhost:${PORT}`);});
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.on('newProduct', (product) => {
        console.log(product);
        socket.emit('agregar',pm.addProduct(product));
    });
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.set('io', io);

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


app.get('/', (req, res) => {
    res.render("home",{
        rutaJs: "script",
        rutaCss: "style"
    }
    );
});

app.get('/realtimeproducts', (req, res) => {
    let products = pm.getProducts();
    let { limit } = req.query;
    if (limit == undefined) {
        res.render("realTimeProducts", {
            products: products,
            rutaJs: "realTimeProducts",
            rutaCss: "realTimeProducts"
        });
    }
    else {
        let productLimit = [];
        for (let i = 0; i < limit; i++) {
            productLimit.push(products[i]);
        }
        res.render("realTimeProducts", {
            products: productLimit,
            rutaJs: "realTimeProducts",
            rutaCss: "realTimeProducts"
        });
    }
}); 