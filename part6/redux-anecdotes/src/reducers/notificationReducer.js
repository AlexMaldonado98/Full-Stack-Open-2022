import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState:  null,
    reducers: {
        setNotification(state,action){
            state = action.payload
            return state
        }
    }
});

export const {setNotification} = notificationSlice.actions

let timeOut = null
export const showNotification = (message,time) => {
    if(timeOut){
        window.clearTimeout(timeOut);
    }
    return (dispatch) => {
        dispatch(setNotification(message))
        timeOut = setTimeout(() => {
            dispatch(setNotification(null))
        }, time * 1000);
    }
}

export default notificationSlice.reducer

/* export const showNotification = (message,time) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'SHOW',
                data:{
                    notification: message
                }
            }
        )
        setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000);
    }
    
}

export const hideNotification = () => {
    return {
        type: 'HIDE'
    }
}

const reducer = (state = null,action) => {
    switch(action.type){
        case 'SHOW':
            return action.data.notification
        case 'HIDE':
            return null
        default:
            return state;
    }
}

export default reducer; */