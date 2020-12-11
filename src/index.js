import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'fontsource-roboto'
import thunk from "redux-thunk"
import {applyMiddleware, createStore} from "redux"
import rootReducer from "./store/reducers/rootReducers"
import {Provider} from "react-redux"
import {axiosInstance, setAuthorization} from "./config/axiosConfig"
import {localStorageTokenConfig} from "./config/localStorageToken"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faHome, faBars, faSignInAlt, faTh, faFolder, faChevronDown, faChevronUp, faSun, faMoon, faTimes,faEnvelope,faKey,faLock,faUser,faEye,faEyeSlash,faSignOutAlt} from "@fortawesome/free-solid-svg-icons"

library.add(faHome,faBars,faSignInAlt, faTh, faFolder, faChevronDown, faChevronUp, faSun, faMoon, faTimes,faEnvelope,faKey,faLock,faUser,faEye,faEyeSlash,faSignOutAlt)

const token = localStorage.getItem('token')
if (token) {
    setAuthorization(axiosInstance, token)
}
localStorageTokenConfig()

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({axiosInstance})))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
