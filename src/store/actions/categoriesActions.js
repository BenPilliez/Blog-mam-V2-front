export const getCategories = () => {
    return (dispatch, getState, {axiosInstance}) => {
        console.log("GET CATEGORIES")
        axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category`, method: 'GET'})
            .then(res => {
                dispatch({type: 'CATEGORIES_LOAD_SUCCESS', categories: res.data.items})
            }).catch(err => {
            dispatch({type: 'CATEGORIES_LOAD_FAILED', error: err.response.data})
        })
    }
}

export const detailCategory = (slug) => {
    return (dispatch, getState, {axiosInstance}) => {

        const detail = getState().categories.detailCategory.find((item) => {
            return item.slug === slug
        })

        if (detail) {
            return detail
        } else {
            axiosInstance({url: `${process.env.REACT_APP_BASE_URL}/category/${slug}`, params:{include: true}, method: 'GET'})
                .then(res => {
                    dispatch({type: 'CATEGORIES_LOAD_DETAIL_SUCCESS', category: res.data})
                })
                .catch(err => {
                    dispatch({type: 'CATEGORIES_LOAD_DETAIL_FAILED', err: err.response.data})
                })
        }
    }
}
