import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducer/notificationReducer';
import blogsReducer from './reducer/blogsReducer';
import loginReducer from './reducer/loginReducer';

const store = configureStore({
    reducer:{
        notification: notificationReducer,
        blogs: blogsReducer,
        login: loginReducer
    }
});

export default store;