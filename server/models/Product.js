import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {type: String, required: true, trim: true},
    price: {type: Number, required: true, min: 0}, // prevent invalid price with min = 0
    description: {type: String},
    category: {type: String, required: true, trim: true, lowercase: true},
    stock: {type: Number, required: true, default: 0, min: 0}, // quantity of products
    images: {type: [String], default: []} // type is array of strings
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export { Product };