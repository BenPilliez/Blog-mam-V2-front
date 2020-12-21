import {combineReducers} from "redux";
import categoriesReducers from "./categoriesReducers";
import authReducers from "./authReducers";
import postsReducers from "./postsReducers";
import commentsReducers from "./commentsReducers";

const rootReducers = combineReducers({
    auth: authReducers,
    categories: categoriesReducers,
    posts: postsReducers,
    comment: commentsReducers
});

export default rootReducers;
