import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILED,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAILED,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAILED,
    PRODUCT_TOP_PRODUCT_REQUEST, PRODUCT_TOP_PRODUCT_SUCCESS, PRODUCT_TOP_PRODUCT_FAILED
} from '../constants/productConstant'

// Our list products 
// Redux-thung allow us to create function inside a function
export const listProducts = (keyword = '', pageNumber = '') => async(dispatch) => {
    try {
            // Dispatch to make request
            dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
            
            // Dispatch for success
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            })
         } catch (error) {
            // dispatch due to error
            dispatch({
                type: PRODUCT_LIST_FAILED,
                payload: error.response && error.response.data.message
                         ? error.response.data.message :error.message
            })
        }
}

// Product details action
export const listProductDetails = (id) => async (dispatch) => {
    try {
        // Dispatch to make request
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)

        // Dispatch for success
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        // dispatch due to error
        dispatch({
            type: PRODUCT_DETAILS_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}
 
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
         await axios.delete(`/api/products/${id}`, config)

        // let dispatch success
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: PRODUCT_DELETE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// Let create product
export const createProductAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/api/products`, {}, config)

        // let dispatch success
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: PRODUCT_CREATE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// Let update product
export const updateProductAction = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        // let dispatch success
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: PRODUCT_UPDATE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// Let create a review
export const createProductReviewAction = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productId}/reviews`, review, config)

        // let dispatch success
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS})


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// List top products for carousel
export const listTopProducts = () => async(dispatch) => {
    try {
            // Dispatch to make request
            dispatch({ type: PRODUCT_TOP_PRODUCT_REQUEST })
            const { data } = await axios.get(`/api/products/top`)
            
            // Dispatch for success
            dispatch({
                type: PRODUCT_TOP_PRODUCT_SUCCESS,
                payload: data
            })
         } catch (error) {
            // dispatch due to error
            dispatch({
                type: PRODUCT_TOP_PRODUCT_FAILED,
                payload: error.response && error.response.data.message
                         ? error.response.data.message :error.message
            })
        }
}