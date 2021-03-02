import express from 'express'
import { protectAuth, isAdmin } from '../middlewares/authMiddleware.js'
const router = express.Router()

import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrdersList, updateOrderDelivered } from '../controllers/orderController.js'


// register user
router.route('/').post(protectAuth, addOrderItems).get(protectAuth, isAdmin, getOrdersList )
router.route('/myorders').get(protectAuth, getMyOrders)
router.route('/:id').get(protectAuth,  getOrderById)
router.route('/:id/pay').put(protectAuth, updateOrderToPaid)
router.route('/:id/deliver').put(protectAuth, isAdmin, updateOrderDelivered)


export default router