import defaults from 'lodash/defaults'
import identity from 'lodash/identity'

import { onAction, onConnect, onDisconnect } from './onEvent'
import { doEmitEvent, invalidAction } from './lang'

function getSessionId() {
  return window.sessionStorage.sessionId || null
}
// Insert sessionId.
function setSessionId({ socketId }) {
  // console.log('setSessionId', id)
  window.sessionStorage.sessionId = socketId
}
const defaultOptions = {
  eventName: 'action',
  getEmitAction: identity,
}
// Should save presenter to sessionStorage too?
// Socket.io socket = io(opts.location)
export default function createSocketMiddleware(socket, options = {}) {
  const { eventName, getEmitAction } = defaults(options, defaultOptions)
  function emitAction(action) {
    socket.emit(eventName, getEmitAction(action))
  }
  // Allow actions to send an emit to server.
  function emitEvent(action) {
    doEmitEvent(action) && socket.emit(sendSocket, emit || payload)
  }
  return (store) => {
    // Wire socket.io to dispatch actions sent by the server.
    socket.on(eventName, onAction(store))
    // When the connection is established. Before any events.
    socket.on('connect', onConnect(store))
    // Tell redux we are no longer connected.
    socket.on('disconnect', onDisconnect(store))
    const isInvalid = invalidAction(store)
    return next => (action) => {
      const { emit, sendSocket, payload } = action
      if (isInvalid(action)) return next(action)
      emitEvent(action)
      // Send most every action to the server. Whoa.
      sendAction(action)
      return next(action)
    }
  }
}
