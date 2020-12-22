const initialState = {
    error: null,
    posts: [],
    carouselPosts: [],
    loadingState: false,
    postDetail: [],
    pagination: {
        totalItems: 0,
        totalPage: 0,
        limit: 10,
        currentPage: 0
    },
};

const postsReducers = (state = initialState, actions) => {

    switch (actions.type) {
        case "POST_LOAD_STATE":
            return {
                ...state,
                loadingState: true,
                error: null
            };
        case "GET_CAROUSEL_POSTS_SUCCESS":
            return {
                ...state,
                carouselPosts: actions.data.items,
                loadingState: false
            };
        case "GET_CAROUSEL_POSTS_FAILED":
            return {
                ...state,
                error: actions.error,
                loadingState: false
            };
        case "GET_POSTS_SUCCESS" :
            return {
                ...state,
                loadingState: false,
                error: null,
                pagination: {
                    totalItems: actions.data.totalItems,
                    totalPages: actions.data.totalPages,
                    limit: actions.data.limit,
                    currentPage: actions.data.currentPage
                },
                posts: actions.data.items
            };
        case "GET_POSTS_FAILED" :
            return {
                ...state,
                loadingState: false,
                error: actions.error
            };
        case "GET_POST_DETAIL_SUCCESS":
            return {
                ...state,
                loadingState: false,
                error: null,
                postDetail: [...state.postDetail, actions.data]
            };
        case "GET_POST_DETAIL_FAILED":
            return {
                ...state,
                loadingState: false,
                error: actions.error
            };
        default:
            return state;
    }
};

export default postsReducers;
