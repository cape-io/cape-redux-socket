import { createReducer } from 'cape-redux'
import { pick } from 'lodash'
import {
  CONNECT, CONNECTED, DISCONNECT, RECONNECTED,
} from './actions'

export const defaultState = {
  connected: false,
  connect: false,
  counter: 0,
  dateModified: null,
  endTime: null,
  presenter: null,
  reconnected: false,
  sessionId: null,
  siteId: null,
  socketId: null, // Current socketId.
  startTime: null,
  // subscriber: {},
}
export const disconnectState = pick(defaultState, 'connected', 'connect', 'socketId', 'reconnected')
export function connectedState(state, payload, rest) {
  return {
    ...state,
    ...payload,
    connected: true,
    connect: false,
    reconnected: false,
    ...rest,
    counter: state.counter + 1,
  }
}
export function connected(state, payload) {
  return connectedState(state, payload, { sessionId: payload.socketId })
}
export function reconnected(state, payload) {
  return connectedState(state, payload, { reconnected: true })
}
export const reducers = {
  [CONNECT]: (state, { startTime }) => ({ ...state, connect: true, startTime }),
  [CONNECTED]: connected,
  [DISCONNECT]: (state, endTime) => ({ ...state, ...disconnectState, endTime }),
  [RECONNECTED]: reconnected,
  // [GUEST_JOIN]: (state, payload) => state.setIn([ 'subscriber', payload ], { id: payload }),
  // [GUEST_LEAVE]: (state, payload) => state.set('subscriber', state.subscriber.without(payload)),
  // [JOINED]: set('sessionId'),
  // [SUBSCRIBE]: (state, payload) => state.set('presenter', payload),
}
const reducer = createReducer(reducers, defaultState)
export default reducer
