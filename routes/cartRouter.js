
const express = require('express')
const router = express.Router()
const cart = require("../controller/cartController")

router.post("/add_cart/:uid/:pid",cart.addCart)
router.get("/list_cart",cart.listCart)
router.patch("/update_cart/:id",cart.updateCart)
router.delete("/delete_cart/:id",cart.deleteCart)

module.exports = router;
