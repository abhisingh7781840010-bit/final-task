
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
    validateEmail,
    validatePassword
} = require("../utils/validators");

// Generate JWT token
const createToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

// SIGNUP — No OTP
const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            education,
            degree
        } = req.body;

        if (!name || !email || !password || !education || !degree) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Enter a valid email address"
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: "Password must be 8-20 characters and contain at least one letter and one number"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            education: education.trim(),
            degree: degree.trim()
        });

        const token = createToken(user);

        return res.status(201).json({
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                education: user.education,
                degree: user.degree
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        return res.status(500).json({
            message: "Signup failed"
        });
    }
};

// LOGIN — No OTP
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = createToken(user);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                education: user.education,
                degree: user.degree
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
};

module.exports = {
    signup,
    login
};