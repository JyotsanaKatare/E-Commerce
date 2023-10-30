
const express = require('express')
const router = express.Router()
const auth = require("../middleWares/auth_middleware")
const vender = require("../controller/venderController")
const validation = require("../validation/vender/venderValidation")

router.post("/vender_signUp", validation.venderSignUpValidation, vender.venderSignUp)
router.post("/vender_login", auth.isVender, validation.venderLogInValidation, vender.venderLogIn)
router.post("/vender_reset_pass_email", vender.venderResetPasswordEmail)
router.post("/vender_pass_reset/:id/:token", vender.venderPassReset)

module.exports = router;
