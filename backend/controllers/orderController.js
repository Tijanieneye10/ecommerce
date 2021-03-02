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
        res.status(201).json(createdOrder)
    }
})

// Let get order by id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(400)
        throw new Error('Order not found')
    }

})

// update the paid document after successful payment
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = order.save()
        res.json(updatedOrder)
    } else {
        res.status(400)
        throw new Error('Order not found')
    }

})

// mark as delivered
const updateOrderDelivered = asyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        const updatedOrder = order.save()
        res.json(updatedOrder)
    } else {
        res.status(400)
        throw new Error('Order not found')
    }

})


// Get orders based on the login customers
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderModel.find({ user: req.user._id })
    res.json(orders)
})

// Get orders lists
const getOrdersList = asyncHandler(async (req, res) => {
    const orders = await orderModel.find({}).populate('user', 'id name')
    res.json(orders)
})








export {
    addOrderItems, getOrderById, updateOrderToPaid,
    getMyOrders, getOrdersList, updateOrderDelivered
}
