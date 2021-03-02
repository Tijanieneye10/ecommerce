import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILED,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILED,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAILED, ORDER_PAY_RESET, ORDER_LIST_MYORDER_FAILED,
    ORDER_LIST_MYORDER_SUCCESS, ORDER_LIST_MYORDER_REQUEST, ORDER_LIST_MYORDER_RESET, ORDER_GET_SUCCESS,
    ORDER_GET_FAILED, ORDER_GET_REQUEST, ORDER_MARK_REQUEST, ORDER_MARK_SUCCESS, ORDER_MARK_FAILED, ORDER_MARK_RESET
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAILED:
            return {loading: false, success: false, order: action.payload}
        default:
            return state
    }
}

// TO GET ORDER BY ID
export const orderDetailsReducer = (state = {loading: true, orderItems: [], shippingAddress:{} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAILED:
            return { loading: false,  order: action.payload }
        default:
            return state
    }
}


// TO GET ORDER BY ID
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAY_FAILED:
            return { error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}


// TO GET LOGGIN USER ORDERS
export const getMyOrdersReducer = (state = {myOrders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_MYORDER_REQUEST:
            return { loading: true }
        case ORDER_LIST_MYORDER_SUCCESS:
            return { loading: false, myOrders: action.payload }
        case ORDER_LIST_MYORDER_FAILED:
            return { error: action.payload }
        case ORDER_LIST_MYORDER_RESET:
            return { myOrders: []}
        default:
            return state
    }
}


// TO GET ALL ORDERS
export const getOrdersReducer = (state = { orderlists: [] }, action) => {
    switch (action.type) {
        case ORDER_GET_REQUEST:
            return { loading: true }
        case ORDER_GET_SUCCESS:
            return { loading: false, orderlists: action.payload }
        case ORDER_GET_FAILED:
            return { error: action.payload }
        // case ORDER_GET_RESET:
        //     return { myOrders: [] }
        default:
            return state
    }
}

// LET MARK AS ORDER
// TO GET ALL ORDERS
export const markOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_MARK_REQUEST:
            return { loading: true }
        case ORDER_MARK_SUCCESS:
            return { loading: false, success: true }
        case ORDER_MARK_FAILED:
            return { error: action.payload }
        case ORDER_MARK_RESET:
            return {}
        default:
            return state
    }
}