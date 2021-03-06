import { defaults, identity } from 'lodash'

import { onServerAction, onClientAction, onConnect, onDisconnect } from './onEvent'

export const defaultOptions = {
  eventName: 'action',
  getEmitAction: identity,
}
// Should save presenter to sessionStorage too?
// Socket.io socket = io(opts.location)
export default function createSocketMiddleware(socket, options = {}) {
  const opts = defaults(options, defaultOptions)
  return (store) => {
    // Wire socket.io to dispatch actions sent by the server.
    socket.on(opts.eventName, onServerAction(store))
    // When the connection is established. Before any events.
    socket.on('connect', onConnect(store, socket))
    // Tell redux we are no longer connected.
    socket.on('disconnect', onDisconnect(store))

    return next => (action) => {
      onClientAction(store, socket, opts, action)
      return next(action)
    }
  }
}
