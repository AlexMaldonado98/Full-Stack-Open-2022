import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'


const store = createStore(
    combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    }),
    composeWithDevTools()
)

export default store;