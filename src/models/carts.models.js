import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products:[{
        id_product: {
            type:String,
            ref: 'products',
            required: true
        },
        code:{
            type: Number,
            required: true
        }
    }]
});


export const cartModel = model('carts', messageSchema);