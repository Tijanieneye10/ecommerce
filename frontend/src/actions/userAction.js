import axios from 'axios'
import {
    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_PROFILE_UPDATE_REQUEST, USER_PROFILE_UPDATE_SUCCESS, USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_PROFILE_UPDATE_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILED, USER_DELETE_FAILED, USER_DELETE_SUCCESS, USER_DELETE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAILED
} from "../constants/userConstant"
import { ORDER_LIST_MYORDER_RESET } from '../constants/orderConstants'

// user login action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', {email, password}, config)

        // let dispatch success
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_LOGIN_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })  
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: ORDER_LIST_MYORDER_RESET
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
}

// user register action
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users', { name, email, password }, config)

        // let dispatch success
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        // Let login user immediately after registration
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_REGISTER_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// user details
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const  { userLogin: { userInfo }} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)

        // let dispatch success
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_DETAILS_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// user PROFILE UPDATE
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/profile`, user, config)

        // let dispatch success
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_PROFILE_UPDATE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

// Let get the list of all users
export const userListAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users`, config)

        // let dispatch success
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_LIST_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// Let delete user
export const userDeleteAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)

        // let dispatch success
        dispatch({ type: USER_DELETE_SUCCESS })

    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_DELETE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}


// Let update users by admin
export const userUpdateAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${user._id}`, user, config)

        // let dispatch success
        dispatch({ type: USER_UPDATE_SUCCESS })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        // dispatch due to error
        dispatch({
            type: USER_UPDATE_FAILED,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}
