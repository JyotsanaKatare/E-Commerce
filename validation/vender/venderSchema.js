
const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const Schema = {
    venderSignUp: joi.object({
        venderName: joi
            .string()
            .min(2)
            .max(20)
            .message({
                "string.min": "Username should min{#limit} characters",
                "string.max": "Username should max{#limit} characters"
            })
            .required(),
        venderEmail: joi
            .string()
            .email()
            .message("Invalid email address")
            .required(),
        venderPassword: joiPassword
            .string()
            .minOfSpecialCharacters(2)
            .minOfLowercase(2)
            .minOfUppercase(2)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .message({
                'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
            })
            .required(),
        venderContact: joi
            .number()
            .integer()
            .min(100000000)
            .max(9999999999)
            .message("Invalid mobile number")
            .required(),

        city: joi
            .string()
            .required(),
        address: joi
            .string()
            .required(),
        aboutVender: joi
            .string()
            .required(),
    }).unknown(true),

    venderLogIn: joi.object({
        venderEmail: joi
            .string()
            .email()
            .required(),
        venderPassword: joi
            .string()
            .required(),
    }).unknown(true),
}

module.exports = Schema
