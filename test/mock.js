import { createStore, combineReducers } from 'redux'
import socket, { defaultState } from '../src/reducer'

export const state = { socket: defaultState }
export const change = { presenter: 'kai', sessionId: 'abc123' }
export const state2 = { socket: { ...defaultState, ...change } }

export const send1 = {
  type: 'something/GREAT',
  payload: {
    id: 'foo',
  },
}
export const send2 = {
  type: 'something/GREAT',
  payload: {
    id: 'foo',
  },
  meta: { cookie: {} },
  sendSocket: 'foo',
}
export const send3 = {
  type: 'something/GREAT',
  meta: { sendSocket: 'bar', emit: 'coffee', cookie: { name: 'sid', value: 'xyz' } },
  payload: { id: 'foo' },
}
export const invalid = {
  payload: 'bar',
}
export const halt1 = {
  type: 'something/GREAT',
  payload: {
    id: 'foo',
  },
  sendSocket: false,
}
export const halt2 = {
  type: 'something/GREAT',
  payload: {
    id: 'foo',
  },
  meta: {
    sendSocket: false,
  },
}
export const action = {
  send1, halt1, halt2,
}
export const store = createStore(combineReducers({ socket }))
