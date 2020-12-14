export const getPosts = (params) => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts`, params: params, method: 'GET'})
            .then(res => {
                dispatch({type: 'GET_POSTS_SUCCESS', data: res.data})
            })
            .catch(err => {
                dispatch({type: 'GET_POSTS_FAILED', error: err.response.data.error})
            })
    }
}

export const getPostDetail = (id) => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts/${id}`, method: 'GET'})
            .then(res => {
                dispatch({type: 'GET_POST_DETAIL_SUCCESS', data: res.data})
            })
            .catch(err => {
                dispatch({type: 'GET_POST_DETAIL_FAILED', error: err.response.data.error})
            })
    }
}
