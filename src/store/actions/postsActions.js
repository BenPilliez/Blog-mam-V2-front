const loadingState = () => {
    return (dispatch) => {
        dispatch({type: "POST_LOAD_STATE"});
    };
};

export const carouselPost = (params) => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts`, params: params, method: "GET"})
            .then(res => {
                dispatch({type: "GET_CAROUSEL_POSTS_SUCCESS", data: res.data});
            })
            .catch(err => {
                dispatch({type: "GET_CAROUSEL_POSTS_FAILED", error: err.response.data.error});
            });
    };
};

export const getPosts = (params) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(loadingState());
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts`, params: params, method: "GET"})
            .then(res => {
                dispatch({type: "GET_POSTS_SUCCESS", data: res.data});
            })
            .catch(err => {
                dispatch({type: "GET_POSTS_FAILED", error: err.response.data.error});
            });
    };
};

export const getPostDetail = (slug) => {
    return (dispatch, getState, {axiosInstance}) => {
        dispatch(loadingState());

        const detail = getState().posts.postDetail.find((item) => {
            return item.slug === slug;
        });

        if (detail) {
            dispatch({type: "GET_POST_DETAIL_SUCCESS", data: detail});
        } else {
            axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts/${slug}`, method: "GET"})
                .then(res => {
                    dispatch({type: "GET_POST_DETAIL_SUCCESS", data: res.data});
                })
                .catch(err => {
                    dispatch({type: "GET_POST_DETAIL_FAILED", error: err.response.data.error});
                });
        }
    };
};
