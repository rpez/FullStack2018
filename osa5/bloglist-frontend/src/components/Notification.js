import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  else {
    if (isError) {
      return (
        <div className="error" >
          {message}
        </div >
      )
    }
    else {
      return (
        <div className="notification" >
          {message}
        </div >
      )
    }
  }
}

export default Notification