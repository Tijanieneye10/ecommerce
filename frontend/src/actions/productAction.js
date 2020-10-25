import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED
} from '../constants/productConstant'

// Our list products 
// Redux-thung allow us to create function inside a function
export const listProducts = () => async(dispatch) => {
    try {
            // Dispatch to make request
            dispatch({ type: PRODUCT_LIST_REQUEST })
            const { data } = await axios.get('/api/products')
            
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
 