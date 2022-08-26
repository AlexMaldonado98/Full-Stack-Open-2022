
export const Notifications = ({ message }) => {
    if(message === null){
        return null;
    }

    if(message.includes('[ERROR]')){
        return <p className="message-error">{message.slice(7,message.length)}</p>;
    }else{
        return <p className="message-success">{message}</p>;
    }
};