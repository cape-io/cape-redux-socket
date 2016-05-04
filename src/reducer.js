import immutable from 'seamless-immutable'
import isFunction from 'lodash/isFunction'

import {
  CONNECT, CONNECTED, DISCONNECT, GUEST_JOIN, GUEST_LEAVE, JOINED, SUBSCRIBE,
} from './actions'

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
export const reducers = {
  [CONNECT]: (state, sessionId) => state.merge({ connected: true, sessionId }),
  [CONNECTED]: (state, payload) => state.set('connected', true).merge(payload),
  [DISCONNECT]: (state, endTime) => state.merge({ connected: false, socketId: null, endTime }),
  [GUEST_JOIN]: (state, payload) => state.setIn([ 'subscriber', payload ], { id: payload }),
  [GUEST_LEAVE]: (state, payload) => state.set('subscriber', state.subscriber.without(payload)),
  [JOINED]: (state, payload) => state.set('sessionId', payload),
  [SUBSCRIBE]: (state, payload) => state.set('presenter', payload),
}
export default function reducer(_state = defaultState, action) {
  if (!action.type || !isFunction(reducers[action.type])) return _state
  return reducers[action.type](_state.asMutable ? _state : immutable(_state), action.payload)
}
