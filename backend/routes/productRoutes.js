import express from 'express'
const router = express.Router()
import { getProducts, getProductById } from '../controllers/productControllers.js'

// To get all the products
router.route('/').get(getProducts)

// To get products based on id
router.route('/:id').get(getProductById)

export default router