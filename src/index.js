import immutable from 'seamless-immutable'

export middleware from './middleware'

export const CONNECT = 'socket/CONNECT'
export const DISCONNECT = 'socket/DISCONNECT'
export const CONNECTED = 'socket/CONNECTED'
export const FEEDBACK = 'socket/FEEDBACK'
export const JOINED = 'socket/JOINED'
export const SUBSCRIBE = 'socket/SUBSCRIBE'
export const GUEST_JOIN = 'socket/GUEST_JOIN'
export const GUEST_LEAVE = 'socket/GUEST_LEAVE'
export const API_FAILURE = 'socket/API_FAILURE'
export const API_REQUEST = 'socket/API_REQUEST'
export const API_SUCCESS = 'socket/API_SUCCESS'

const defaultState = immutable({
  connected: false,
  endTime: null,
  presenter: null,
  sessionId: null,
  siteId: null,
  socketId: null,
  startTime: null,
  subscriber: {},
})
function wrapState(state, action) {
  if (!action.type) return state
  return state.asMutable ? state : immutable(state)
}
export default function reducer(_state = defaultState, action) {
  const { type, payload } = action
  const state = wrapState(_state, action)
  switch (type) {
    case '@@INIT':
      return state.asMutable ? state : immutable(state)
    case CONNECT:
      return state.merge({ connected: true, sessionId: payload })
    case DISCONNECT:
      return state.merge({ connected: false, socketId: null, endTime: payload })
    case CONNECTED:
      // Is it stupid to also set connected to true? Used on backend.
      return state.set('connected', true).merge(payload)
    case JOINED:
      return state.set('sessionId', payload)
    case SUBSCRIBE:
      return state.set('presenter', payload)
    case GUEST_JOIN:
      return state.setIn([ 'subscriber', payload ], { id: payload })
    case GUEST_LEAVE:
      return state.set('subscriber', state.subscriber.without(payload))
    default:
      return state
  }
}

export function idReducer(state = null, action) {
  if (action.type === CONNECTED && action.payload.socketId) {
    return action.payload.socketId
  }
  return state
}

export function connect(payload) {
  return {
    type: CONNECT,
    payload,
  }
}
export function connected(socketId, siteId) {
  const now = new Date()
  return {
    type: CONNECTED,
    payload: {
      siteId,
      socketId,
      startTime: now.toString(),
    },
  }
}
export function disconnect() {
  const now = new Date()
  return {
    type: DISCONNECT,
    payload: now.toString(),
    sendSocket: false,
  }
}
export function feedback(message) {
  return {
    type: FEEDBACK,
    payload: message,
  }
}
export function guestJoined(id) {
  return {
    type: GUEST_JOIN,
    payload: id,
  }
}
export function joined(sessionId) {
  return {
    type: JOINED,
    payload: sessionId,
  }
}
export function subscribe(presenter) {
  return {
    type: SUBSCRIBE,
    payload: presenter,
  }
}
export function apiFailure() {
  return {
    type: API_FAILURE,
  }
}
export function apiRequest(payload) {
  return {
    type: API_REQUEST,
    payload,
  }
}
export function apiSuccess(entities) {
  return {
    type: API_SUCCESS,
    response: { entities },
  }
}
