import express from 'express'
import protectAuth from '../middlewares/authMiddleware.js'
const router = express.Router()
import { addOrderItems } from '../controllers/orderController.js'


// register user
router.route('/').post(protectAuth,addOrderItems)




export default router