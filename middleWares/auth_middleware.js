
const jwt = require("jsonwebtoken")
const user = require("../models/userModelSchema")

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await user.findById(userId).select("password");
            next()
        } catch (err) {
            res.status(401).send({
                status: "failed",
                message: "unauthorized user" + err.message
            })
        }
    }
    if (!token) {
        res.status(401).send({
            message: "The user is unauthorized have no token"
        })
    }
}

const isUser = async (req, res, next) => {
    let userRole = req.body.userRole
    if (userRole) {
        if (userRole === "user") {
            next();
        } else {
            res.status(400).json({
                message: "Its not user role"
            })
        }
    } else {
        res.status(400).json({
            message: "User role is not present"
        })
    }
}

const isVender = async (req, res, next) => {
    let venderRole = req.body.venderRole
    if (venderRole) {
        if (venderRole === "vender") {
            next();
        } else {
            res.status(400).json({
                message: "Its not vender role"
            })
        }
    } else {
        res.status(400).json({
            message: "Vender role is not present"
        })
    }
}

module.exports = {
    checkUserAuth,
    isUser,
    isVender
}
