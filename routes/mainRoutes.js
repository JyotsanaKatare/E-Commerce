
const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const venderRouter = require('./venderRouter')
const productRouter = require('./productRouter')
const reviewRouter = require('./reviewRouter')
const cartRouter = require('./cartRouter')

router.use("/user", userRouter);
router.use("/vender", venderRouter);
router.use("/product", productRouter);
router.use("/review", reviewRouter);
router.use("/cart", cartRouter);

module.exports = router;
