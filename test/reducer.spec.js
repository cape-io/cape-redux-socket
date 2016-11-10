import test from 'tape'
import { isString } from 'lodash'
import reducer, { connect, connected } from '../src'

test('reducer connect', (t) => {
  const action = connect()
  const state = reducer(undefined, action)
  t.equal(state.connect, true)
  t.ok(isString(state.startTime), 'startTime')
  t.end()
})
test('connected', (t) => {
  const socketId = 'a12b34'
  const action = connected(socketId)
  const state = reducer(undefined, action)
  t.equal(state.connect, false, 'connect')
  t.equal(state.connected, true, 'connected')
  t.equal(state.reconnected, false, 'reconnected')
  t.equal(state.sessionId, socketId, 'sessionId')
  t.equal(state.socketId, socketId, 'socketId')
  const state2 = reducer(state, connected('soc2', 'steFoSo'))
  t.equal(state2.socketId, 'soc2')
  t.equal(state2.sessionId, 'soc2')
  t.equal(state2.siteId, 'steFoSo')
  t.end()
})
