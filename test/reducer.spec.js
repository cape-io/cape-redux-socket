import test from 'tape'

import reducer, { connect, connected } from '../src'

test('connect', (t) => {
  const action = connect({ sessionId: 'a12b34' })
  const state = reducer(undefined, action)
  t.equal(state.sessionId, 'a12b34')
  t.equal(state.connect, true)
  t.end()
})
test('connected', (t) => {
  const socketId = 'a12b34'
  const action = connected(socketId)
  const state = reducer(undefined, action)
  t.equal(state.sessionId, socketId, 'sessionId')
  t.equal(state.socketId, socketId, 'socketId')
  t.equal(state.connect, false, 'connect')
  const state2 = reducer(undefined, connect({ sessionId: 'a12b34' }))
  const { sessionId } = reducer(state2, connected(socketId))
  t.equal(sessionId, socketId)
  t.end()
})
