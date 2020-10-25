import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })


const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    name: {
        type: String,
        required: [true, 'name is required'],
    },

    image: {
        type: String,
        required: [true, 'image is required']
    },

    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true,
        // default: 0
    },

    countInStock: {
        type: Number,
        required: true,
        default: 0
    },


    


}, { timestamps: true })

const productModel = mongoose.model('products', productSchema)
export default productModel