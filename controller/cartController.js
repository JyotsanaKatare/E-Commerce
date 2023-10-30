
const cartModelSchema = require("../models/cartModelSchema")

const addCart = async (req, res) => {
    try {
        const cartAdd = await new cartModelSchema(req.body)
        cartAdd.userId = req.params.uid;
        cartAdd.productId = req.params.pid;
        try {
            const cart = await cartAdd.save();
            res.status(201).json({
                success: true,
                message: "Cart successfully added",
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


const listCart = async (req, res) => {
    try {
        const listCart = await cartModelSchema.find();
        res.status(200).json({
            success: true,
            message: "Show cart list here",
            cart_data: listCart
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        })
    }
}


const updateCart = async(req,res) => {
    const id = req.params.id;
    try{
       const newCart = await cartModelSchema.findByIdAndUpdate(id,{$set : req.body});
       newCart.save();
       res.status(200).json({
        success : true,
        message : "Cart successfully update"
       });
    }catch (err) {
        res.status(400).json({
            success : false,
            error : err.message
        });
    }
}


const deleteCart = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteCart = await cartModelSchema.findByIdAndDelete(id, { $set: req.body });
        res.status(200).json({
            success: true,
            message: "Your cart successfully deleted"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}

module.exports = {
    addCart,
    listCart,
    updateCart,
    deleteCart
}
