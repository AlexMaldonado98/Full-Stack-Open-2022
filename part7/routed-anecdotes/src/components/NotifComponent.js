export const NotifComponent = ({message}) => {
    if(!message){
        return null
    }

    return(
      <div>
        {message}
      </div>
   );
};