const notificationsAtStart = [
  ''
]

const initialState = notificationsAtStart

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.msg
  case 'EMPTY':
    return action.msg
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

export const empty = (msg) => {
  return {
    type: 'EMPTY',
    msg
  }
}

export default reducer