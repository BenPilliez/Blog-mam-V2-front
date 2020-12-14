import {combineReducers} from "redux"
import categoriesReducers from "./categoriesReducers"
import authReducers from "./authReducers"
import postsReducers from "./postsReducers"

const rootReducers = combineReducers({
    auth: authReducers,
    categories : categoriesReducers,
    posts: postsReducers
})

export default rootReducers
