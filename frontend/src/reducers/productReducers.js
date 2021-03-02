import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILED,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILED,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAILED,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_PRODUCT_REQUEST,
    PRODUCT_TOP_PRODUCT_SUCCESS,
    PRODUCT_TOP_PRODUCT_FAILED
} from '../constants/productConstant'

// ALL PRODUCT FETCH REDUCER
export const productListReducer = (state = { products: [] }, action) => {
    // let use switch for our actions
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false, products: action.payload.products, pages:
                action.payload.pages, page: action.payload.page
            }
        case PRODUCT_LIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// SINGLE PRODUCT DETAILS REDUCER
export const productDetailsReducer = (state = { product: { reviews: []} }, action) => {
    // let use switch for our actions
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAILED:
             return { loading: false, error: action.payload }
        case PRODUCT_DETAILS_RESET:
            return {product: {}}
        default:
            return state
    }
}

// SINGLE PRODUCT DELETE REDUCER
export const productDeleteReducer = (state = {}, action) => {
    // let use switch for our actions
        switch (action.type) {
            case PRODUCT_DELETE_REQUEST:
            return { loading: true, }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true}
        case PRODUCT_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// For adding product
export const createProductReducer = (state = {}, action) => {
    // let use switch for our actions
        switch (action.type) {
            case PRODUCT_CREATE_REQUEST:
            return { loading: true, }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAILED:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// For updating product
export const updateProductReducer = (state = { product:{} }, action) => {
    // let use switch for our actions
        switch (action.type) {
            case PRODUCT_UPDATE_REQUEST:
            return { loading: true, }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

// LET REVIEW PRODUCTS
export const productReviewReducer = (state = {}, action) => {
    // let use switch for our actions
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true, }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAILED:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

// Get top product for carousel
export const getTopProducts = (state = { products: []}, action) => {
    // let use switch for our actions
    switch (action.type) {
        case PRODUCT_TOP_PRODUCT_REQUEST:
            return { loading: true, products:[] }
        case PRODUCT_TOP_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_PRODUCT_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}