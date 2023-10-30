
const reviewModelSchema = require("../models/reviewModelSchema")

const addReview = async (req, res) => {
    try {
        const userId = await reviewModelSchema.findOne({ userId: req.params.uid });
        const productId = await reviewModelSchema.findOne({ productId: req.params.pid })
        if (userId && productId) {
            res.status(409).json({
                success: false,
                message: "Review is already exist",
            });
        } else {
            const reviewAdd = new reviewModelSchema(req.body)
            reviewAdd.userId = req.params.uid;
            reviewAdd.productId = req.params.pid;
            const filePath = `/uploads/${req.file.filename}`;
            reviewAdd.reviewImage = filePath;
            try {
                await reviewAdd.save();
                res.status(201).json({
                    success: true,
                    message: "Review added successfully",
                })
            } catch (err) {
                res.status(400).json({
                    success: false,
                    Error: err.message,
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message,
        });
    }
}


const listReview = async (req, res) => {
    try {
        const listReview = await reviewModelSchema.find();
        res.status(200).json({
            success: true,
            message: "Show review list here",
            review_data: listReview
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


const updateReview = async (req, res) => {
    const id = req.params.id;
    try {
        const newReview = await reviewModelSchema.findByIdAndUpdate(id, { $set: req.body });
        newReview.save();
        res.status(200).json({
            success: true,
            message: "Review update successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const deletereview = await reviewModelSchema.findByIdAndDelete(id, { $set: req.body });
        res.status(200).json({
            success: true,
            message: "Your successfully deleted"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            Error: err.message
        });
    }
}


module.exports = {
    addReview,
    listReview,
    updateReview,
    deleteReview
}
