import thunkMiddleware from 'redux-thunk'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware, compose} from 'redux'
import {loadingBarMiddleware} from 'react-redux-loading-bar'

import rootReducer from './reducer'

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        reduxPromiseMiddleware, // resolves promises
        loadingBarMiddleware(), // manages loading bar
        createLogger(), // log actions in console
    ),
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default store
