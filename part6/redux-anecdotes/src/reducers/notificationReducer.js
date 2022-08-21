
export const showNotification = (message) => {
    return {
        type: 'SHOW',
        data:{
            notification: message
        }
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