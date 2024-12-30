import mongoose from "mongoose";
import bcrypt from "bcrypt";
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "college", "admin"],
        default: "user",
    },
    address: {
        street: String,
        city: String,
        state: String,
        college: String,
        zip: Number,
        
    },
    phone: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{ timestamps: true }
);  


usersSchema.pre("save", async function (next) {
    if (this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 12);
    
    next();
})

usersSchema.methods.comparePassword = async function ( candidatePassword, UserPassword) {
    return await bcrypt.compare(candidatePassword, UserPassword);
};

export const User = mongoose.model("User", usersSchema);