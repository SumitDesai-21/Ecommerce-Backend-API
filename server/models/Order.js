import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User" // unique: false here as user can place multiple orders
    },

    items: [
        {
            product: {
              type: Schema.Types.ObjectId,
              ref: "Product",
              required: true  
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, min: 1},
        }
    ],
    totalAmount: { type: Number, required: true, min: 0},
    status: {
        type: String,
        enum: [
            "PENDING",
            "PAID",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ],
        default: "PENDING"
    },
}, { timestamps: true })