
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendMailer = require("../services/emailservice")
const { sendEmail } = require("../services/emailservice")
const venderModelSchema = require("../models/venderModelSchema")

const venderSignUp = async (req, res) => {
    try {
        const isEmailExists = await venderModelSchema.findOne({ venderEmail: req.body.venderEmail });
        if (isEmailExists) {
            res.status(400).json({
                success: false,
                message: "Vender's email is already exists"
            });
        } else {
            const venderSignUp = await new venderModelSchema(req.body)
            const salt = await bcrypt.genSalt(10);
            venderSignUp.venderPassword = await bcrypt.hash(req.body.venderPassword, salt);
            try {
                venderSignUp.save();
                res.status(200).json({
                    success: true,
                    message: "Vender's data successfully registered",
                });
            } catch (err) {
                res.status(400).json({
                    success: false,
                    Error: err.message
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


const venderLogIn = async (req, res) => {
    try {
        const { venderEmail, venderPassword } = req.body;
        if (venderEmail && venderPassword) {
            const vender = await venderModelSchema.findOne({ venderEmail: venderEmail });
            if (vender != null) {
                const isMatch = await bcrypt.compare(venderPassword, vender.venderPassword);
                if (vender.venderEmail === venderEmail && isMatch) {
                    const token = jwt.sign({ venderId: vender.vender_id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.status(200).json({
                        success: true,
                        message: "Vender successfully login",
                        "data": vender,
                        "token": token
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Email or Password is invalid"
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: "You are not registered vender"
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


const venderResetPasswordEmail = async (req, res) => {
    const { venderEmail } = req.body;
    try {
        const vender = await venderModelSchema.findOne({ venderEmail: venderEmail });
        if (vender != null) {
            const secret = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ venderId: vender._Id }, secret, { expiresIn: '60m' });
            const link = 'http://127.0.0.1:9000/api/user/reset/${user._Id}/${token}';
            const id = vender._id
            const emailSend = await sendMailer.sendEmail(venderEmail, token, id)
            return res.status(200).json({
                success: true,
                message: "Email send to vender successfully",
                venderId: vender._id,
                token: token
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Vender's email is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            Error: err.message,
        });
    }
}


const venderPassReset = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await venderModelSchema.findById(id);
        if (checkUser != null) {
            const secretKey = process.env.JWT_SECRET_KEY;
            jwt.verify(token, secretKey);
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(confirmPassword, salt);
                await venderModelSchema.findByIdAndUpdate(checkUser._Id, { $set: { password: password }, });
                res.status(200).json({
                    success: true,
                    message: "Vender's password successfully update",
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Newpassword and Confirmpassword is not match",
                });
            }
        } else {
            res.status(403).json({
                success: false,
                message: "Vender's email is not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            Error: err.message,
        });
    }
}

module.exports = {
    venderSignUp,
    venderLogIn,
    venderResetPasswordEmail,
    venderPassReset
}
