const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    successRegister: false,
    error: null
}

const authReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case 'SIGN_OUT':
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            return {
                ...state,
                error: null,
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
            }
        case 'AUTH_SIGNUP_FAILED':
            return {
                ...state,
                error: actions.error
            }
        case 'AUTH_SIGNUP_SUCCESS':
            return {
                ...state,
                successRegister: true
            }
        case 'FORM_SENDING':
            console.log('FORM_SENDING')
            return {
                ...state,
                error: null
            }

        case 'AUTH_RESET_STATE':
            return {
                ...state,
                error: null
            }
        default :
            return state
    }
}

export default authReducers
