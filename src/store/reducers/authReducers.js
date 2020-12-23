const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    successRegister: false,
    error: null,
    deleteError: false
};

const authReducers = (state = initialState, actions) => {
    switch (actions.type) {
        case "SIGN_OUT":
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                ...state,
                error: null,
                user: null
            };
        case "AUTH_SIGNIN_FAILED" :
            return {
                ...state,
                error: actions.error
            };
        case "AUTH_SIGNIN_SUCCESS":
            return {
                ...state,
                user: actions.data.user,
            };
        case "AUTH_SIGNUP_FAILED":
            return {
                ...state,
                error: actions.error
            };
        case "AUTH_SIGNUP_SUCCESS":
            return {
                ...state,
                successRegister: true
            };
        case "AUTH_UPDATE_SUCCESS":
            return {
                ...state,
                user: actions.user
            };

        case "AUTH_UPDATE_FAILED":
            return {
                ...state,
                error: actions.err
            };
        case "FORM_SENDING":
            console.log("FORM_SENDING");
            return {
                ...state,
                error: null
            };

        case "AUTH_DELETE_USER":
            return state;

        case "AUTH_DELETE_FAILED":
            return {
                ...state,
                deleteError: actions.error
            };
        default :
            return state;
    }
};

export default authReducers;
