import { Router } from 'express';
import path from 'path';
import __dirname from "../utils.js";
import PM from '../../productManager.js';
import productModel from '../models/products.models.js';

const productsFile = '../products.json';

let pm = new PM.ProductManager(path.resolve(__dirname, productsFile));

const productRouter = Router();

productRouter.get('/', (req, res) => {
    let { limit } = req.query;
    try {
        //let products = pm.getProducts();
        let products = productModel.find().limit(limit);
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error.message}` });
    }
});

productRouter.get('/:pid', (req, res) => {
    const { pid } = req.params;
    try {
        //let products = pm.getProducts();
        const product = productModel.findById(pid);
        product ? res.status(200).send(product) : res.status(404).send({ error: `No se encontró el producto ${pid}` });
    } catch (error) {
        res.status(400).send({ error: `Error al consultar el producto ${pid}: ${error.message}` });
    }
});

productRouter.post('/', (req, res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const product = productModel.create({
            title, description, stock, code, price, category
        });
        res.status(200).send({ resultado: 'OK', message: product })
    } catch (error) {
        res.status(400).send({ error: `Error al crear el producto ${pid}: ${error.message}` });
    }
});


productRouter.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, stock, code, price, category } = req.body;
    try {
        const respuesta = productModel.findByIdAndUpdate(pid, {
            title, description, stock, code, price, category
        });
        respuesta ? res.status(200).send({ resultado: 'OK', message: respuesta }) : res.status(404).send({ error: `No se encontró el producto ${pid}` });
    } catch (error) {
        res.status(400).send({ error: `Error al actualizar el producto ${pid}: ${error.message}` });
    }
});



productRouter.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    try {
        const respuesta = productModel.findByIdAndDelete(pid);
        respuesta ? res.status(200).send({ resultado: 'OK', message: respuesta }) : res.status(404).send({ error: `No se encontró el producto ${pid}` });
    } catch (error) {
        res.status(400).send({ error: `Error al borrar el producto ${pid}: ${error.message}` });
    }
});

export default productRouter;