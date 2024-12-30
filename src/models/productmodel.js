import mongoose from "mongoose";
const productVariationSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantitiy: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
    },
});
import { Vendor } from "./vendormodelmodel";
const productSchema = new mongoose.Schema({
name: {
type: String,
required: true,
},
description: { String,
    Vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    Image: [String],
        variations: [productVariationSchema], 
        ratingAverage: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],

    },
}, { timestamps: true } 
);

export const product = mongoose.model("product", productSchema);