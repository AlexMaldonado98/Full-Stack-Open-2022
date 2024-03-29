
export const showNotification = (message,time) => {
    return (dispatch) => {
        window.clearTimeout(window.a);
        dispatch(
            {
                type: 'SHOW',
                data:{
                    notification: message
                }
            }
        )
        window.a = setTimeout(() => {
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

export default reducer;