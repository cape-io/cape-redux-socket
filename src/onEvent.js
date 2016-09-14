import flow from 'lodash/flow'
import set from 'lodash/fp/set'

import { getSessionId, connectSelector } from './select'
import { connect, disconnect } from './actions'

// Every time the client is sent an action over socket.io
export function onAction({ dispatch }) {
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
