// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
// import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }
});


/* const store = createStore(

    combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer,
        filter: filterReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
) */

export default store;