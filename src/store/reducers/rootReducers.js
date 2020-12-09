import {combineReducers} from "redux"
import categoriesReducers from "./categoriesReducers";

const rootReducers = combineReducers({
    categories : categoriesReducers
})

export default rootReducers
