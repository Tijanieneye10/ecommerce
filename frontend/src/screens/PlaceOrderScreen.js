import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Button, Row, Col, Image, ListGroup, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)

    // Let declare a proper decimal
    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    } 
    // Calculate prices
    cart.itemPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    // shipping price
    cart.shippingPrice = addDecimal(cart.itemPrice > 100 ? 100 : 0)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemPrice).toFixed(2)))



    cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    const placeOrderHandler = () => {
        console.log('yeah')
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />  
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address </strong>
                                 {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='danger'>Your cart is empty </Message> : 
                            (
                                <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index)=>(
                                        <ListGroup.Item>
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
                                <Col>${cart.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Place Order
                           </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
