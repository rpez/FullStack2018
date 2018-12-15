import React from 'react'
import { notify } from '../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.store.getState().notifications}
      </div>
    )
  }
}

export default Notification
