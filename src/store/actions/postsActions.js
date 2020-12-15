export const getPosts = (params) => {
    return (dispatch, getState, {axiosInstance}) => {
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts`, params: params, method: 'GET'})
            .then(res => {
                dispatch({type: 'GET_POSTS_SUCCESS', data: res.data})
            })
            .catch(err => {
                console.error(err)
                dispatch({type: 'GET_POSTS_FAILED', error: err.response.data.error})
            })
    }
}

export const getPostDetail = (slug) => {
    return (dispatch, getState, {axiosInstance}) => {

        const detail = getState().posts.postDetail.find((item) => {
            return item.slug === slug
        })

        if (detail) {
            return detail
        } else {
            axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/posts/${slug}`, method: 'GET'})
                .then(res => {
                    dispatch({type: 'GET_POST_DETAIL_SUCCESS', data: res.data})
                })
                .catch(err => {
                    dispatch({type: 'GET_POST_DETAIL_FAILED', error: err.response.data.error})
                })
        }
    }
}
