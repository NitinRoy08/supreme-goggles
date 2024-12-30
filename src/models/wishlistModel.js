import mongoose from "mongoose";
import { User } from "../routes/userModel";

const wishlistSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
    ],
},
{ timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);