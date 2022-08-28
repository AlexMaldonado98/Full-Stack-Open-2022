import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducer/notificationReducer';
import blogsReducer from './reducer/blogsReducer';
import loginReducer from './reducer/loginReducer';
import usersReducer from './reducer/usersReducer';

const store = configureStore({
    reducer:{
        notification: notificationReducer,
        blogs: blogsReducer,
        login: loginReducer,
        users: usersReducer
    }
});

export default store;