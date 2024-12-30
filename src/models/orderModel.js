import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
},

{ _id: false, timestamps: true }
);


const cancelletionSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{ _id: false }
);
 const returnSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{ _id: false }
);


import { User } from "../routes/userModel";
import { Vendor } from "./vendormodel";
const orderSchema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
         required: true,
    
        },
        items: [orderItemsSchema],
        totalprice: { type: Number, required: true },
        status: 
        { type: String, 
            enum: ["pending", "success", "failed"],
             default: "pending",
        },
        address:{
            street: String,
            city: String,
            state: String,
            zip: Number,
        },
        paymentmethod: {
            type: String,
            enum: ["card", "paypal"],
            required: true,

        },
        cancellation:cancelletionSchema,
        return:returnSchema,
    },
    { timestamps: true }
    );

    export const Order = mongoose.model("Order", orderSchema);