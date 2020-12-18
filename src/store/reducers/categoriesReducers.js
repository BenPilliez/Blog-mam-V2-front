const initState = {
    categories: null,
    detailCategory: [],
    error: false
};

const categoriesReducers = (state = initState, actions) => {

    switch (actions.type) {
        case "CATEGORIES_LOAD_SUCCESS" :
            return {
                ...state,
                categories: actions.categories
            };
        case "CATEGORIES_LOAD_FAILED":
            return {
                ...state,
                error: actions.error
            };
        case "CATEGORIES_LOAD_DETAIL_SUCCESS" :
            const detail = [...state.detailCategory, actions.category];
            return {
                ...state,
                detailCategory: detail
            };
        default :
            return state;
    }

};

export default categoriesReducers;
