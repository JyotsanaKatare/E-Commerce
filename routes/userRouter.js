
const express = require('express')
const router = express.Router()
const user = require("../controller/userController")
const auth = require("../middleWares/auth_middleware")
const { upload } = require('../middlewares/imageStorage')
const { validate } = require('../models/userModelSchema')
const validation = require("../validation/user/userValidation")

router.post("/user_signUp", upload.single("profilePic"), validation.userSignUpValidation, user.userSignUp)
router.post("/user_logIn", auth.isUser, validation.userLogInValidation, user.userLogIn)
router.post("/user_reset_pass_email", user.userResetPasswordEmail)
router.post("/user_reset_password/:id/:token", user.userPasswordReset)

module.exports = router;
