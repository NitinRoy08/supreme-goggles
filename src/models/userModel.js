import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user" ,"vendor"],
        default: "user",
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
    },
    phone: {
        type: String,
    },
    isactive: {
        type: Boolean,
        default: true,
    },
},
{ timestamps: true }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,12);
    next();
});
userSchema.methods.comparePassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
};


export const User = mongoose.model("User", userSchema);