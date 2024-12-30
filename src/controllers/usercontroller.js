import { User } from "../models/controllers/routes/sercices/utils/userModel";   
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

// @desk    Register a new user
// @route    /api/users
// @access    Public

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, role, address, phone } = req.body;
    try {
        // First check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            address,
            phone,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                phone: user.phone,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "30d",
                }),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});
