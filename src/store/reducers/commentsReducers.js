const initState = {
    error: false,
    success: false
};

const commentsReducers = (state = initState, actions) => {

    switch (actions.type) {
        case "COMMENT_POST_SENDING":
            return {
                ...state,
                error: false,
                success: false
            };
        case "COMMENT_POST_SUCCESS":
            console.log("allo");
            return {
                ...state,
                success: true
            };
        case "COMMENT_POST_FAILED":
            return {
                ...state,
                success: false,
                error: actions.error
            };
        default :
            return state;
    }

};

export default commentsReducers;
