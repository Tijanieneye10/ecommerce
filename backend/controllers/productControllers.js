import asyncHandler from 'express-async-handler'
import productModel from '../models/productsModel.js'

// get all products
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4
    const page = req.query.pageNumber || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        } 
    } : {} 
    const countProduct = await productModel.countDocuments({...keyword})
    const products = await productModel.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
    res.json({ products, page, pages: Math.ceil(countProduct / pageSize) })
})

// get product by id
const getProductById = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// Let delete product by id
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// Let create a product
const createProduct = asyncHandler(async (req, res) => {
    const product = new productModel({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        category: 'Sample Category',
        brand: 'Sample Brand',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// Update product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await productModel.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else{
        res.status(404)
        throw new Error('Product not found')
    }

})

// Update product
const productReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await productModel.findById(req.params.id)

    if (product) {
        const userAlreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (userAlreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        } 
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review Added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

// Get top product for our carousel
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)  
})


export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    productReview,
    getTopProducts
}