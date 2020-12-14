const initialState = {
    error: null,
    posts: []
}

const postsReducers = (state= initialState, actions) => {

    switch(actions.type){
        case 'GET_POSTS_SUCCESS' :
            return {
                ...state,
                posts: actions.data.items
            }
        default: return state
    }
}

export default postsReducers
