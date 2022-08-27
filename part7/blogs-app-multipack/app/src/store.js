import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducer/notificationReducer';

const store = configureStore({
    reducer:{
        notification: notificationReducer
    }
});

export default store;