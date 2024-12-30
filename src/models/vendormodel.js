import mongoose from "mongoose";
import { User } from "../routes/userModel";

const SubscriptionSchema = new mongoose.Schema({
    plan: {
        type: String,
        enum: ["basic", "premium", "gold"],
        required: true,
    },
    SubscriptionDate: {
        type: Date,
        required: true,
    },
    SubscriptionEndDate: {
        type: Date,
        required: true,
    },
    SubscriptionStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    isActive: {
        type: Boolean,
        default: true,
    },

},{_id: false}

);
const VendorSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
    Subscription: SubscriptionSchema,
},
{ timestamps: true }
);

export const Vendor = mongoose.model("Vendor", VendorSchema);