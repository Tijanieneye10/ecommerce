import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderListActions } from '../actions/orderAction'




const OrderListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const orderLists = useSelector(state => state.orderLists)
    const { loading, error, orderlists } = orderLists

    // Let confirm user login
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    let count = 1


    useEffect(() => {
        if(!userInfo.isAdmin){
            history.push('/login')
        } else {
            dispatch(getOrderListActions())
        }
    }, [userInfo, history, dispatch])



    return <>


     
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped hover responsive bordered className='table-sm'>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER ID</th>
                        <th>TOTAL PRICE</th>
                        <th>BUYER</th>
                        <th>PAID STATUS</th>
                        <th>DELIVERED STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orderlists.map(order => (
                        <tr key={order._id}>
                            <td>{count++}</td>
                            <td>{order._id}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.user.name} </td>
                            <td>{order.isPaid ? (<i className="fas fa-eye"></i>) : (<i className="fas fa-check-square"></i>)} </td>
                            <td>{order.isDelivered ? (<i class="fas fa-check-square"></i>) : (<i class="fas fa-eye"></i>)} </td>
                            
                            <td><LinkContainer to={`/orders/${order._id}`}>
                                <Button variant='light' className='btn-sm'>Details</Button>
                            </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        )}

    </>
}

export default OrderListScreen
