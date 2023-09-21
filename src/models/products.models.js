import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type:String,
        required: true,
},
    status: {
        type:Boolean,
        default: true
    },
    code:{
        type: String,
        unique: true
    },
    thumbnail: []
});

const productModel = model('products', messageSchema);
export default productModel;