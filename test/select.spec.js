import test from 'tape'

import { getSocket, getSessionId, getPresenter } from '../src/select'
import { change, state, state2 } from './mock'

test('getSocket', (t) => {
  t.equal(getSocket(state), state.socket)
  t.equal(getSocket(state2), state2.socket)
  t.end()
})
test('getSessionId', (t) => {
  t.equal(getSessionId(state), null)
  t.equal(getSessionId(state2), change.sessionId)
  t.end()
})
test('getPresenter', (t) => {
  t.equal(getPresenter(state), null)
  t.equal(getPresenter(state2), change.presenter)
  t.end()
})
