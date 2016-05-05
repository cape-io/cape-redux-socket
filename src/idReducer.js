import { CONNECTED } from './actions'

export default function idReducer(state = null, action) {
  if (action.type === CONNECTED && action.payload.socketId) {
    return action.payload.socketId
  }
  return state
}
