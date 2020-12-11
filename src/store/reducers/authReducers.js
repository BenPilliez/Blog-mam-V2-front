const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    success: false,
    error: null
}

const authReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case 'SIGN_OUT':
            return {
                error: null,
                success: null,
                user: null
            }
        case 'AUTH_SIGNIN_FAILED' :
            return {
                ...state,
                error: actions.error
            }
        case 'AUTH_SIGNIN_SUCCESS':
            return {
                ...state,
                user: actions.data.user,
                success: true
            }
        case 'AUTH_SIGNUP_FAILED':
            return {
                ...state,
                error: actions.error
            }
        case 'AUTH_SIGNUP_SUCCESS':
            return {
                ...state,
                success: true
            }
        case 'AUTH_RESET_STATE':
            return {
                success: false,
                error: null
            }
        default :
            return state
    }
}

export default authReducers
