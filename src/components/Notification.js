

const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else {
      return (
        <div>
          {message}
        </div>
      )
    }
}

export default Notification