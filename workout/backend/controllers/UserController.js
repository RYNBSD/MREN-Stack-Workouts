const userModel = require("../models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' });
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!(email.trim().length && password.trim().length)) {
            return res.status(400).json({
                Error: "Enter all fields",
            }); 
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                Error: "Enter a valid email",
            }); 
        }

        const user = await userModel.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({
            email,
            token
        });
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
}

const signup = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                Error: "Enter a strong password",
            }); 
        }

        const user = await userModel.signup(email, password);

        const token = createToken(user._id);

        res.status(200).json({
            email,
            token
        });
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
}

module.exports = {
    login,
    signup
}