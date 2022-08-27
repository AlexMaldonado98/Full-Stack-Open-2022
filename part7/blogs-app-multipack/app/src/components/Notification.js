import { useSelector } from 'react-redux/es/exports';
export const Notifications = () => {
    const contentReducer = useSelector(state => state.notification);

    if(contentReducer === null){
        return null;
    }

    if(contentReducer?.includes('[ERROR]')){
        return <p className="message-error">{contentReducer.slice(7,contentReducer.length)}</p>;
    }else{
        return <p className="message-success">{contentReducer}</p>;
    }
};