import express from 'express'
const router = express.Router()
import {
    getProducts, getProductById, deleteProduct, createProduct,
    updateProduct, productReview, getTopProducts
} from '../controllers/productControllers.js'
import { protectAuth, isAdmin } from '../middlewares/authMiddleware.js'

// To get all the products
router.route('/').get(getProducts).post(protectAuth, isAdmin, createProduct)
// Product review route
router.route('/:id/reviews').post(protectAuth, productReview)

// get top products for carousel route
router.get('/top', getTopProducts)

// To get products based on id
router.route('/:id').get(getProductById).delete(protectAuth, isAdmin, deleteProduct).put(protectAuth, isAdmin, updateProduct)

export default router