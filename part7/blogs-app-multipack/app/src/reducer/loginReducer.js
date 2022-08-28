import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../services/login';
import { ShowNotification } from './notificationReducer';
import servicesBlog from '../services/blogs';

const loginReducer = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        login(state, action) {
            return action.payload;
        },
        onloadUser(state,action){
            return action.payload;
        },
        logout(){
            return null;
        }
    }
});

export const { login, onloadUser, logout } = loginReducer.actions;

export const loginUserCredentials = (userData) => {
    return async(dispatch) => {
        try {
            const user = await loginUser({ username: userData.userName, passwordHash: userData.password });
            servicesBlog.setToken(user.token);
            window.localStorage.setItem('userCredentials',JSON.stringify(user));
            dispatch(login(user));
        } catch (error) {
            dispatch(ShowNotification(`[ERROR] ${error.response.data.error}`,5000));
        }
    };
};

export const getUserFromStorage = (user) => {
    return (dispatch) => {
        dispatch(onloadUser(user));
    };
};

export const logoutSesion = () => {
    return (dispatch) => {
        dispatch(logout());
    };
};
/* export const setUser = (userData) => {
    return async (dispatch) => {
        try {
            const user = await loginUser({ username: userData.userName, passwordHash: userData.password });
            window.localStorage.setItem('userCredentials', JSON.stringify(user));
            dispatch(getUser(user));
        } catch (error) {
        }
    };
}; */



export default loginReducer.reducer;