import {setAuthorization} from "../../config/axiosConfig"


export const ResetState = () => {
    return (dispatch) => {
        dispatch({type: 'AUTH_RESET_STATE'})
    }
}

export const sendForm = () => {
    return (dispatch) => {
        dispatch({type: 'FORM_SENDING'})
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({type: 'SIGN_OUT'})
    }
}

export const Signup = (form) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(sendForm())
      axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/signup`, data: form, method: 'POST'})
            .then(res => {
                dispatch({type: 'AUTH_SIGNUP_SUCCESS', data: res.data})
            })
            .catch(err => {
                let error;
                if(err.response.data.error && typeof err.response.data.error.errors === "object" ){
                    error = []
                    err.response.data.error.errors.map((item) => {
                       return error = [...error, item.message]
                    })
                }else {
                    error= 'Oops une erreur est survenue, veuillez essayer plus tard'
                }
                console.log(error)
                dispatch({type: 'AUTH_SIGNUP_FAILED', error: typeof error === "object" ? error.join('\n') : error})
            })
    }
}

export const Signin = (credentials) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(sendForm())

        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/signin`, data: credentials, method: 'POST'})
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', res.data.token)
                setAuthorization(axiosInstance, res.data.token)
                dispatch({type: 'AUTH_SIGNIN_SUCCESS', data: res.data})
            }).catch(err => {
            dispatch({type: 'AUTH_SIGNIN_FAILED', error: err.response.data.error})

        })
    }
}
