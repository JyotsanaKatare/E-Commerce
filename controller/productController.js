
const productModelSchema = require("../models/productModelSchema")

const addProduct = async (req, res) => {
    try {
        const productAdd = await new productModelSchema(req.body)
        const filePath = req.files.map(({filename}) => `/uploads/${filename}`);
        productAdd.prodPic = filePath;
        try {
            const product = await productAdd.save();
            res.status(201).json({
                success: true,
                message: "Product successfully added",
            })
        } catch (err) {
            res.status(400).json({
                success: false,
                Error: err.message
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


const prodList = async (req, res) => {
    try {
        const prodList = await productModelSchema.find();
        res.status(200).json({
            success: true,
            message: "Show product list here",
            prod_data: prodList
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        })
    }
}


const prodDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const prodData = await productModelSchema.findOne({ prodId: req.params.prodId})
            .populate({
                path: "venderId",
                select: "venderName venderEmail city"
            })
        res.status(200).json({
            success: true,
            message: "Show product details here",
            prodData: prodData
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}


const prodDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const prodDelete = await productModelSchema.findByIdAndDelete(id, { $set: req.body });
        res.status(200).json({
            success: true,
            message: "Your product successfully deleted"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


const prodUpdate = async(req,res) => {
    const id = req.params.id;
    try{
       const newProd = await productModelSchema.findByIdAndUpdate(id,{$set : req.body});
       newProd.save();
       res.status(200).json({
        success : true,
        message : "Product successfully update"
       });
    }catch (err) {
        res.status(400).json({
            success : false,
            error : err.message
        });
    }
}

module.exports = {
    addProduct,
    prodList,
    prodDetails,
    prodDelete,
    prodUpdate
}
