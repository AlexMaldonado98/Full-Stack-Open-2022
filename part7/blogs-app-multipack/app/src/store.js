import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducer/notificationReducer';
import blogsReducer from './reducer/blogsReducer';

const store = configureStore({
    reducer:{
        notification: notificationReducer,
        blogs: blogsReducer
    }
});

export default store;