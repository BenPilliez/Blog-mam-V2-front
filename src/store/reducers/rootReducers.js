import {combineReducers} from "redux"
import categoriesReducers from "./categoriesReducers"
import authReducers from "./authReducers"

const rootReducers = combineReducers({
    auth: authReducers,
    categories : categoriesReducers
})

export default rootReducers
