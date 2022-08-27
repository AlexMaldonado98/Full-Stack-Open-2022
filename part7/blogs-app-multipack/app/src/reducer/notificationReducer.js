import { createSlice } from '@reduxjs/toolkit';


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state,action){
            state = action.payload;
            return state;
        },
        setNullNotificaaton(state){
            state = null;
            return state;
        }
    }
});
export const { setNotification,setNullNotificaaton } = notificationSlice.actions;
let timeOut = null;
export const ShowNotification = (message,time) => {
    if(timeOut){
        window.clearTimeout(timeOut);
    }
    return (dispatch) => {
        dispatch(setNotification(message));
        timeOut = setTimeout(() => {
            dispatch(setNullNotificaaton());
        }, time);
    };
};

export default notificationSlice.reducer;