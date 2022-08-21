import { useSelector } from "react-redux/es/exports"

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const style = {
    color: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(!notification){
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification