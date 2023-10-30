
const mongoose = require('mongoose')
const cartModelSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    deliveryStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    paymentStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    isactive: {
        type: Boolean,
        required: true,
        default: true,
    },
})

cartModelSchema.set('timestamps', true)
module.exports = mongoose.model('cart', cartModelSchema)
