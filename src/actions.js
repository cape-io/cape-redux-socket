import noop from 'lodash/noop'

import createAction from './createAction'

// Sent from client to server on socket init.
export const CONNECT = 'socket/CONNECT'
export const connect = createAction(CONNECT)

export const CONNECTED = 'socket/CONNECTED'
export function connectedPayload(socketId, siteId) {
  const now = new Date()
  return { siteId, socketId, startTime: now.toString() }
}
export const connected = createAction(CONNECTED, connectedPayload)

export const DISCONNECT = 'socket/DISCONNECT'
export function disconnectPayload() {
  const now = new Date()
  return now.toString()
}
export const disconnect = createAction(DISCONNECT, disconnectPayload)

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
