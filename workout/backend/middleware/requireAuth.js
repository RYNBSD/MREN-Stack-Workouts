const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            error: "Authorization required"
        })  
    }

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await userModel.findById(_id).select("_id");
        next();
    }
    catch (e) {
        return res.status(401).json({
            error: "request is not authorized"
        })
    }
}

module.exports = {
    requireAuth
}