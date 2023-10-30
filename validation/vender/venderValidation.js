
const { join } = require("path")
const { Console } = require("console")
const vender = require("./venderSchema")
const keys = require("joi/lib/types/keys")
const { default: common } = require("joi/lib/common")

module.exports = {
    venderSignUpValidation: async (req, res, next) => {
        const value = await vender.venderSignUp.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    venderLogInValidation: async (req, res, next) => {
        const value = await vender.venderLogIn.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}
