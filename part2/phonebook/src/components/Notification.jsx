const Notification = ({message}) => {
    if (message.className === null) {
        return null
    }

    return (
        <div className={message.className}>{message.message}</div>
    )
}

export default Notification