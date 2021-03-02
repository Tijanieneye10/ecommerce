import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, orderPayActions, orderMarkActions } from '../actions/orderAction'
import { ORDER_PAY_RESET, ORDER_MARK_RESET } from '../constants/orderConstants'

function OrderScreen({ match, history }) {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // to get the payment reducer status
     const orderPay = useSelector(state => state.orderPay)
     const { loading: loadingPay, success: successPay } = orderPay
    
    const orderMark = useSelector(state => state.orderMark)
    const { loading: loadingMark, success: successMark } = orderMark

    
    if (!loading) {
        
        // Let declare a proper decimal
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        // Calculate prices
        order.itemPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const  {data: clientId}  = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =    `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        // check if not order or successPay is available to dispatch
        if (!order || successPay || successMark) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_MARK_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
    }, [orderId, dispatch, order, successPay, successMark, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPayActions(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(orderMarkActions(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name:</strong> {order.user.name}</p>
                                <p>
                                    <strong>Email:</strong> {' '}
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}
                                    {order.shippingAddress.postalCode} {order.shippingAddress.country}
                                </p>
                            {order.isDelivered ? <Message variant='success'> Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message>
                            }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                            {order.isPaid ? <Message variant='success'> Paid on {order.paidAt}</Message> :
                                <Message variant='danger'>Not Paid</Message>
                            }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message variant='danger'>Order is empty </Message> :
                                    (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item) => (
                                                <ListGroup.Item key={item._id}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.age} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`} >
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} =  ${item.qty * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </ListGroup.Item>
                            
                        )} 
                        {loadingMark && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block'
                                    onClick={deliverHandler}>
                                    Mark As Delivered
                                    </Button>
                            </ListGroup.Item>
                        )}
                        </ListGroup>
                    </Col>
                </Row>
        </>
}

export default OrderScreen
