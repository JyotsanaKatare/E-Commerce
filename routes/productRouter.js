
const express = require('express')
const router = express.Router()
const product = require("../controller/productController")
const { upload } = require('../middlewares/imageStorage')
const validation = require('../validation/product/productValidation')

router.post("/add_product", upload.array("prodPic"),validation.addProdValidation, product.addProduct)
router.get("/prod_list",product.prodList)
router.get("/prod_detail/:id",product.prodDetails)
router.delete("/prod_delete/:id",product.prodDelete)
router.patch("/prod_update/:id",product.prodUpdate)

module.exports = router;
