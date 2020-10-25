import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress, savePaymentMethod } from '../actions/cartAction'

function PaymentMethodScreen({ history }) {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h2>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label as='legend'>Select Method </Form.Label>
                <Col>
                    <Form.Check type='radio' label='Paypal or credit card' id='Paypal'
                        name="paymentMethod" value="Paypal" checked
                        onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
                </Form.Group>
      
         
                <Button type="submit" variant='primary'>
                    Continue
                </Button>



            </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
