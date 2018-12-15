const notificationsAtStart = [
  'render here notification...'
]

const initialState = notificationsAtStart

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.message
  default:
    return state
  }
}

export const notify = (msg) => {
  return {
    type: 'NOTIFY',
    msg
  }
}

export default reducer