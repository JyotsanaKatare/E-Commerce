
const joi = require("joi")

const Schema = {
    addProd: joi.object({
        prodName: joi
            .string()
            .min(2)
            .max(30)
            .message({
                "string.min": "Username should min{#limit} characters",
                "string.max": "Username should max{#limit} characters"
            })
            .required(),
        prodDescription: joi
            .string()
            .max(250)
            .message({
                'string.max': '{#label} length must be less or equal to {#limit} characters long.'
            })
            .required(),
        prodPrice: joi
            .number()
            .integer()
            .greater(500)
            .message({
                'number.max': '{#label} product price length must be greater to {#limit} numbers long.'
            })
            .required(),
        prodFeature: joi
            .string()
            .max(100)
            .message({
                'string.max': '{#label} length must be less or equal to {#limit} characters long.'
            })
            .required(),
        prodSpecification: joi
            .string()
            .max(300)
            .message({
                'string.max': '{#label} length must be less or equal to {#limit} characters long.'
            })
            .required(),
    }).unknown(true),
}

module.exports = Schema
