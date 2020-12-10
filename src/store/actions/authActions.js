import {setAuthorization} from "../../config/axiosConfig"

export const Signup = (form) => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/signup`, data: form, method: 'POST'})
            .then(res => {
                dispatch({type: 'AUTH_SIGNUP_SUCCESS', data: res.data})
            })
            .catch(err => {
                dispatch({type: 'AUTH_SIGNUP_FAILED', error: err.response.data})
            })
    }
}

export const Signin = (credentials) => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/signin`, data: credentials, method: 'POST'})
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', res.data.token)
                setAuthorization(axiosInstance, res.data.token)
                dispatch({type: 'AUTH_SIGNIN_SUCCESS', data: res.data})
            }).catch(err => {
            dispatch({type: 'AUTH_SIGNIN_FAILED', error: err.response.data})
        })
    }
}
