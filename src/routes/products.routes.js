import { Router } from 'express';
import __dirname from "../utils.js";
import {productModel} from '../models/products.models.js';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
    let { limit } = req.query;
    try {
        //let products = pm.getProducts();
        const products = await productModel.find().limit(parseInt(limit));
        console.log(products);
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error.message}` });
    }
});

productRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        //let products = pm.getProducts();
        const product = await productModel.findById(pid);
        product ? res.status(200).send(product) : res.status(404).send({ error: `No se encontró el producto ${pid}` });
    } catch (error) {
        res.status(400).send({ error: `Error al consultar el producto ${pid}: ${error.message}` });
    }
});

productRouter.post('/', async (req, res) => {
    const { title, description, stock, code, price, category } = req.body;
    try {
        const product = await productModel.create({
            title, description, stock, code, price, category
        });
        res.status(200).send({ resultado: 'OK', message: product })
    } catch (error) {
        res.status(400).send({ error: `Error al crear el producto ${pid}: ${error.message}` });
    }
});


productRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { title, description, stock, code, price, category } = req.body;
    try {
        const respuesta = await productModel.findByIdAndUpdate(pid, {
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