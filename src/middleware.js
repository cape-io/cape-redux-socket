import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

import Cookies from 'js-cookie'
import { connect, disconnect, JOINED } from './index'
// Look in action.meta for cookie.
function setSid(meta) {
  const { cookie } = meta
  if (cookie) {
    const { name, value, options } = cookie
    if (value) {
      Cookies.set(name, value, options)
    } else {
      Cookies.remove(name, options)
    }
    // Remove the cookie from the action. Do not send it along to other middleware or reducers.
    delete meta.cookie // eslint-disable-line no-param-reassign
  }
}

function getSessionId() {
  return sessionStorage.sessionId || null
}
// Insert sessionId.
function setSessionId(id) {
  // console.log('setSessionId', id)
  sessionStorage.sessionId = id
}
export function getEmitAction(action) {
  const cookieJar = Cookies.get()
  if (isEmpty(cookieJar)) return action
  // Add cookie information to action sent to server.
  return merge({}, action, { meta: { cookie: cookieJar } })
}

// Should save presenter to sessionStorage too?
// Socket.io socket = io(opts.location)
export default function createSocketMiddleware(socket, options = {}) {
  // Defaults.
  const opts = {
    eventName: 'action',
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
      // This could/should really be its own middleware.
      if (act.meta) setSid(act.meta)
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
      const { emit, sendSocket, type, payload } = action
      const state = store.getState()
      // We do not care about any action without type prop set.
      if (!type) return next(action)
      // Pass along any action with sendSocket set to false.
      if (sendSocket === false || type.endsWith('_SUCCESS')) {
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
        socket.emit(opts.eventName, getEmitAction(action))
        return next(action)
      }
    }
  }
}
