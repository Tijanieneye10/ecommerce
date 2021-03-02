import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer, productDetailsReducer, productDeleteReducer,
    createProductReducer, updateProductReducer, productReviewReducer, getTopProducts
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer, userRegisterReducer,
    userDetailsReducer, userUpdateProfileReducer,
    userListReducer, userDeleteReducer, userUpdateReducer 
} from './reducers/userReducer'
import {
    orderCreateReducer, orderDetailsReducer, orderPayReducer,
    getMyOrdersReducer, getOrdersReducer, markOrderReducer
} from './reducers/orderReducers'


// Reducers in the store
const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    productReview: productReviewReducer,
    getTopProducts,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    getMyOrders: getMyOrdersReducer,
    orderLists: getOrdersReducer,
    orderMark: markOrderReducer,
    userList: userListReducer,
})

const middleware = [thunk]


// Let get cart from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage}
}


    
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store