import express from 'express';
import fs from 'fs';
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js"; 
import __dirname from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


app.get('/', (req, res) => {
    res.send(
    '<div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%); display:flex; justify-content: space-between;width:25vw">' +
        
    '<a href="/api/products"'+
    'style="line-height: 1.5;font-size: 14px;font-family: \'Source Sans Pro\', sans-serif;box-sizing:inherit;vertical-align: middle;overflow: hidden;text-decoration: none;text-align: center;cursor: pointer;user-select: none;background-color: #04AA6D!important;color: white!important;padding: 10px 20px;border: none;outline: 0;white-space: normal;width: 93px;border-radius: 25px;">Ir a productos</a>' +
        
    '<a href="/api/cart"'+
    'style="line-height: 1.5;font-size: 14px;font-family: \'Source Sans Pro\', sans-serif;box-sizing:inherit;vertical-align: middle;overflow: hidden;text-decoration: none;text-align: center;cursor: pointer;user-select: none;background-color: #04AA6D!important;color: white!important;padding: 10px 20px;border: none;outline: 0;white-space: normal;width: 93px;border-radius: 25px;">Ir a carrito</a>' +
    
    '</div>');
});


app.listen(8080, () => {
    console.log('\nServidor escuchando en http://localhost:8080');
});