import express from 'express';
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js"; 
import { engine } from 'express-handlebars';
import Handlebars from 'handlebars';
import __dirname from "./utils.js";
import path from 'path';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import {productModel} from './models/products.models.js';
import cartModel from './models/cart.models.js';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';

const PORT = 4000;
const uri = "mongodb+srv://rulink:coderhouse@cluster0.qa4tn25.mongodb.net/Proyecto_Cursada_47280?retryWrites=true&w=majority&appName=AtlasApp";

mongoose.connect(uri)
    .then(async () => {console.log('Base de datos conectada')
        //await cartModel.create({})
    })
    .catch(e => console.log(e));


const app = express();
const server = app.listen(PORT, () => {console.log(`\nServidor escuchando en http://localhost:${PORT}`);});
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('agregarProducto', async (product) => {
        console.log(product);
        try{
            await productModel.create(product);
            let products = await productModel.find()
            io.emit('productos', products);
        }catch(e){
            console.log(e);
        }
    });


});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

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

app.get('/realtimeproducts', async (req, res) => {
    let { limit } = req.query;
    let products = await productModel.find().limit(parseInt(limit));
    res.render("realTimeProducts", {
        products: products,
        rutaJs: "realTimeProducts",
        rutaCss: "realTimeProducts"
    });
}); 