
const mongoose = require('mongoose')
const reviewModelSchema = new mongoose.Schema({
    enterYourReview: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewImage: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
})

reviewModelSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewModelSchema)
