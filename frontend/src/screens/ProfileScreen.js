import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { getMyOrdersActions } from '../actions/orderAction'


const ProfileScreen = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    // redux at work
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    // To get my order lists
    const getMyOrders = useSelector(state => state.getMyOrders)
    const { loading: loadingMyOrders, error: errorMyOrders, myOrders } = getMyOrders

    // Let check user login
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfileUpdate = useSelector(state => state.userProfileUpdate)
    const { success } = userProfileUpdate

    // to disable login user not to visit login
    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrdersActions())
                console.log(myOrders)
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, myOrders])

    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch here
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }


    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Updated Successfully!</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter Fullname"
                        value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address </Form.Label>
                    <Form.Control type="email" placeholder="Enter Email Address"
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='cpassword'>
                    <Form.Label>Confirm Password </Form.Label>
                    <Form.Control type="password" placeholder="Enter Confirm Password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingMyOrders ? <Loader /> : errorMyOrders ? <Message variant='danger'>{errorMyOrders}</Message> : (
                <Table striped bordered hover reponsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map(order => (  
                        <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-time' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-time' style={{ color: 'red' }}></i>
                                )}</td>
                                <td><LinkContainer to={`/orders/${order._id}`}>
                                    <Button className="btn-sm" variant='light' >Details</Button>    
                                </LinkContainer></td>
                        </tr>
                        ))}
                        <tr>

                        </tr>
                        <tr>

                        </tr>
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
    
}

export default ProfileScreen
