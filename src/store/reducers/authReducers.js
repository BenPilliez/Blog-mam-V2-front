const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    success: false,
    error: null
}

const authReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case 'AUTH_SIGNIN_FAILED' :
            return {
                ...state,
                error: actions.err
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
                error: actions.err
            }
        case 'AUTH_SIGNUP_SUCCESS':
            return {
                ...state,
                success: true
            }
        default :
            return state
    }
}

export default authReducers
