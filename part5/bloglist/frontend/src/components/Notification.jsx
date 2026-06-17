const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.className}>
      {message.data}
    </div>
  )
} 

export default Notification