import test from 'tape'
import { isString } from 'lodash'
import {
  CONNECT, connect, CONNECTED, connected, connecting, disconnect, RECONNECTED, reconnected,
} from '../src'

test('connect', (t) => {
  const action = connect('abc123')
  t.equal(action.type, CONNECT, 'action type')
  t.equal(action.payload.sessionId, 'abc123')
  t.ok(isString(action.payload.startTime))
  t.end()
})

const socketId = 'socket123'
const siteId = 'siteABC'

test('connected', (t) => {
  const action = connected(socketId, siteId)
  t.equal(action.type, CONNECTED, 'action type')
  t.equal(action.payload.socketId, socketId)
  t.equal(action.payload.siteId, siteId)
  t.ok(isString(action.payload.dateModified))
  t.equal(action.meta.cookie.name, 'sid')
  t.equal(action.meta.cookie.value, socketId)
  t.end()
})
const sessionId = 'sessFOO123'
test('reconnected', (t) => {
  const action = reconnected(socketId, siteId, sessionId)
  t.equal(action.type, RECONNECTED, 'action type')
  t.equal(action.payload.socketId, socketId)
  t.equal(action.payload.siteId, siteId)
  t.equal(action.payload.sessionId, sessionId)
  t.ok(isString(action.payload.dateModified))
  t.false(action.meta.cookie)
  t.end()
})
test('connecting', (t) => {
  const action1 = connecting(socketId, siteId)
  t.equal(action1.type, CONNECTED)
  const action2 = connecting(socketId, siteId, sessionId)
  t.equal(action2.type, RECONNECTED)
  t.end()
})
test('disconnect', (t) => {
  const action = disconnect()
  t.ok(isString(action.payload))
  t.end()
})
