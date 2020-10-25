import asyncHandler from 'express-async-handler'
import orderModel from '../models/orderModel.js'

// create new order
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemPrice,
        taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order Items')
        return
    } else {
        const order = new orderModel({
            orderItems, shippingAddress, paymentMethod, itemPrice,
            taxPrice, shippingPrice, totalPrice, user: req.user._id
        })
        const createdOrder = await order.save()
        res.status(201).json({ createdOrder })
    }
})

export {
    addOrderItems
}
