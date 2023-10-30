
const mongoose = require('mongoose')
const productModelSchema = new mongoose.Schema({
    prodName: {
        type: String,
        required: true
    },
    prodPic: {
        type: [String],
        required: true
    },
    prodDescription: {
        type: String,
        required: true
    },
    prodPrice: {
        type: Number,
        required: true
    },
    prodFeature: {
        type: String,
        required: true
    },
    prodSpecification: {
        type: String,
        required: true
    },
    prodOfferPrice: {
        type: String,
    },
    prodRating: {
        type: Number,
        default: "0"
    },
    venderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'vender'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
})

productModelSchema.set('timestamps', true)
module.exports = mongoose.model('prod', productModelSchema)
