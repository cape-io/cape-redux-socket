import identity from 'lodash/identity'

import { connect, disconnect, JOINED } from './index'


function getSessionId() {
  return sessionStorage.sessionId || null
}
// Insert sessionId.
function setSessionId(id) {
  // console.log('setSessionId', id)
  sessionStorage.sessionId = id
}

// Should save presenter to sessionStorage too?
// Socket.io socket = io(opts.location)
export default function createSocketMiddleware(socket, options = {}) {
  // Defaults.
  const opts = {
    eventName: 'action',
    getEmitAction: identity,
    ...options,
  }
  return store => {
    // Wire socket.io to dispatch actions sent by the server.
    socket.on(opts.eventName, (action) => {
      const act = action
      // If an action comes from the server do not send it back to the server.
      act.sendSocket = false
      store.dispatch(act)
      // Joined. Server returns valid sessionId.
      if (act.type === JOINED) {
        setSessionId(act.payload)
      }
    })
    // When the connection is established. Before any events.
    socket.on('connect', () => {
      // Tell local state we are connected.
      store.dispatch(connect({
        // Send url query information.
        // page: store.getState().filter.page,
        // Tell server result of our local sessionId.
        sessionId: getSessionId(),
      }))
    })
    // Tell redux we are no longer connected.
    socket.on('disconnect', () => {
      store.dispatch(disconnect())
    })

    return next => action => {
      const { emit, meta, sendSocket, type, payload } = action
      const state = store.getState()
      // We do not care about any action without type prop set.
      if (!type) return next(action)
      // Pass along any action with sendSocket set to false.
      if (sendSocket === false || (meta && meta.sendSocket === false)) {
        return next(action)
      }
      // Allow actions to send an emit to server.
      if (typeof sendSocket === 'string') {
        socket.emit(sendSocket, emit || payload)
      }
      // Prevent location actions from trigger.
      if (state.socket && state.socket.presenter) {
        console.log('Subscribe mode prevented local action', type)
      } else {
        // Send most every action to the server. Whoa.
        socket.emit(opts.eventName, opts.getEmitAction(action))
      }
      return next(action)
    }
  }
}
