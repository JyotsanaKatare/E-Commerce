
const { join } = require("path")
const product = require('./productSchema')
const keys = require("joi/lib/types/keys")
const { default: common } = require("joi/lib/common")

module.exports = {
    addProdValidation: async (req, res, next) => {
        const value = await product.addProd.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
