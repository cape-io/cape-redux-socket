import { defaultState } from '../src/reducer'

export const state = { socket: defaultState }
export const change = { presenter: 'kai', sessionId: 'abc123' }
export const state2 = { socket: defaultState.merge(change) }

export const send1 = {
  type: 'something/GREAT',
  payload: {
    id: 'foo',
  },
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
