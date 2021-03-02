import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILED, ORDER_DETAILS_FAILED,
    ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAILED,
    ORDER_LIST_MYORDER_REQUEST, ORDER_LIST_MYORDER_SUCCESS, ORDER_LIST_MYORDER_FAILED, ORDER_GET_REQUEST,
    ORDER_GET_FAILED, ORDER_GET_SUCCESS, ORDER_MARK_FAILED, ORDER_MARK_SUCCESS, ORDER_MARK_REQUEST
} from '../constants/orderConstants'
import axios from 'axios'
export const createOrderActions = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)

        // let dispatch success
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: ORDER_CREATE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }  
}
// get order details action
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)

        // let dispatch success
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: ORDER_DETAILS_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// update paid actions
export const orderPayActions = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        // let dispatch success
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: ORDER_PAY_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// to get logged in user order
export const getMyOrdersActions = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MYORDER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)

        // let dispatch success
        dispatch({
            type: ORDER_LIST_MYORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: ORDER_LIST_MYORDER_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// Let get all the orders
export const getOrderListActions = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_GET_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/`, config)

        // let dispatch success
        dispatch({
            type: ORDER_GET_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: ORDER_GET_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// Let get all the orders
export const orderMarkActions = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MARK_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        // let dispatch success
        dispatch({
            type: ORDER_MARK_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: ORDER_MARK_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}