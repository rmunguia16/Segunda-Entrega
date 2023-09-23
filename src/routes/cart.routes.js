import { Router } from 'express';
import path from 'path';
import __dirname from "../utils.js";
import cartModel from '../models/cart.models.js';

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
    try {
        const cart = await cartModel.findOne({_id: "650e8b3a5135e9c1fec876bc"})
        res.status(200).send(cart);
    }
    catch (e) {
        res.status(400).send({ error: `Error al consultar los carritos: ${e}` });
    }
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        console.log(cart);
        if (cart) {
            cart.products.push({ id_product: pid, quantity: quantity })
            const response = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({ respuesta: 'OK', mensaje: response })
        }
    }
    catch (e) {
        res.status(400).send({ error: `Error al agregar al carrito: ${e}` });
    }
});

export default cartRouter; // Permite que otros archivos puedan importar este archivo