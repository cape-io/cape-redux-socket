import flow from 'lodash/flow'
import set from 'lodash/fp/set'

import { getSessionId, connectSelector } from './select'
import { connect, disconnect } from './actions'
import { doEmitAction, doEmitEvent, getSendSocket, getEventBody } from './lang'

export function onClientAction(action, store, emit, { eventName, getEmitAction }) {
  // Send most every action to the server. Whoa.
  if (doEmitAction(action, store)) emit(eventName, getEmitAction(action))
  // Allow actions to emit custom things. Probably a hack overloading an action like that?
  if (doEmitEvent(action)) emit(getSendSocket(action), getEventBody(action))
}
// Every time the client is sent an action over socket.io
export function onServerAction({ dispatch }) {
  // If an action comes from the server do not send it back to the server.
  return flow(set('sendSocket', false), dispatch)
}
// Every time client first connects to server.
export function onConnect({ dispatch, getState }) {
  return flow(getState, getSessionId, connectSelector, connect, dispatch)
}
// Client disconnected from server.
export function onDisconnect({ dispatch }) {
  return flow(disconnect, dispatch)
}

// function getSessionId() {
//   return window.sessionStorage.sessionId || null
// }
// // Insert sessionId.
// function setSessionId({ socketId }) {
//   // console.log('setSessionId', id)
//   window.sessionStorage.sessionId = socketId
// }
