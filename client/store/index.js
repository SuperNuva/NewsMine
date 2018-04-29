import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import { newsReducer } from "./allArticles";
import { articlesByCatReducer, articlesByKeyReducer } from './userArticles';

const reducer = combineReducers({user, articles: newsReducer, articlesByCategory: articlesByCatReducer, articlesByKeyword: articlesByKeyReducer})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'