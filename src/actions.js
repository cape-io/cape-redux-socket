import { cond, curry, noop, nthArg, stubTrue } from 'lodash'

import { createAction } from 'cape-redux'

export function now() {
  return new Date().toString()
}

export const createCookie = curry((name, value) => ({ cookie: { name, value } }))
export const CONNECT = 'socket/CONNECT'
// Sent from client to server on socket init.
// @see middelware/createSocketMiddleware()
export function connectPayload(sessionId) {
  return { sessionId, startTime: now() }
}
export const connect = createAction(CONNECT, connectPayload)

// New, no cookie connection event sent from server.
export const CONNECTED = 'socket/CONNECTED'
export function connectedPayload(socketId, siteId, sessionId) {
  return { sessionId, siteId, socketId, dateModified: now() }
}
export const connected = createAction(CONNECTED, connectedPayload, createCookie('sid'))
// Cookie connection event sent from server.
export const RECONNECTED = 'socket/RECONNECTED'
export const reconnected = createAction(RECONNECTED, connectedPayload)

export const connecting = cond([
  [ nthArg(2), reconnected ],
  [ stubTrue, connected ],
])

export const DISCONNECT = 'socket/DISCONNECT'
export const disconnect = createAction(DISCONNECT, now)

export const FEEDBACK = 'socket/FEEDBACK'
export const feedback = createAction(FEEDBACK)

export const GUEST_JOIN = 'socket/GUEST_JOIN'
export const guestJoined = createAction(GUEST_JOIN)

export const GUEST_LEAVE = 'socket/GUEST_LEAVE'
export const guestLeave = createAction(GUEST_LEAVE)

export const JOINED = 'socket/JOINED'
export const joined = createAction(JOINED)

export const SUBSCRIBE = 'socket/SUBSCRIBE'
export const subscribe = createAction(SUBSCRIBE)

// DEPRICATED
export const API_FAILURE = 'socket/API_FAILURE'
export const apiFailure = createAction(API_FAILURE, noop)
export const API_REQUEST = 'socket/API_REQUEST'
export const apiRequest = createAction(API_REQUEST)
export const API_SUCCESS = 'socket/API_SUCCESS'
export const apiSuccess = createAction(API_SUCCESS, entities => ({ entities }))
