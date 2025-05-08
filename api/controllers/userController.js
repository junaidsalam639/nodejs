const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const JWT_SECRET = "FSHDFJSDJKFHSDJKFHSDJHFSDJHFJHFSDJKHFJKHFJKHSDJKFHSJ";

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists",
                message: "A user with this email already exists. Please use a different email."
            });
        }

        const user = new User({ name, email, password });
        const savedUser = await user.save();

        const token = jwt.sign(
            { userId: savedUser._id, email: savedUser.email },
            JWT_SECRET);

        res.status(201).json({
            token,
            user: savedUser
        });
    } catch (err) {
        res.status(400).json({
            error: "Validation Error",
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "Invalid credentials",
                message: "No user found with this email"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid credentials",
                message: "Incorrect password"
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET);

        res.status(200).json({
            token,
            user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
