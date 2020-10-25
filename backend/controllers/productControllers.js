import asyncHandler from 'express-async-handler'
import productModel from '../models/productsModel.js'

// get all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find({})
    res.json(products)
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

export {
    getProducts,
    getProductById
}