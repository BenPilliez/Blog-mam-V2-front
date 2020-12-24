const formSending = () => {
    return (dispatch) => {
        dispatch({type: "COMMENT_POST_SENDING"});
    };
};

export const postComment = (form) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(formSending());
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/comments`, data: form, method: "POST"})
            .then(res => {
                dispatch({type: "COMMENT_POST_SUCCESS"});
            }).catch(error => {
            dispatch({type: "COMMENT_POST_FAILED", error});
        });
    };
};

export const replyComment = (form) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(formSending());
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/comments/reply`, data: form, method: "POST"})
            .then(res => {
                dispatch({type: "COMMENT_POST_SUCCESS"});
            }).catch(error => {
            dispatch({type: "COMMENT_POST_FAILED", error});
        });
    };
};
