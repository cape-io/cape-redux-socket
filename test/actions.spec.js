import test from 'tape'

import { CONNECT, connect, CONNECTED, connected } from '../src'

test('connect', (t) => {
  const action = connect('abc123')
  t.equal(action.type, CONNECT, 'action type')
  t.equal(action.payload, 'abc123')
  t.end()
})

test('connected', (t) => {
  const sid = 'abc123'
  const action = connected(sid, 'foo')
  t.equal(action.type, CONNECTED, 'action type')
  t.equal(action.payload.socketId, sid)
  t.equal(action.payload.siteId, 'foo')
  t.equal(action.meta.cookie.name, 'sid')
  t.equal(action.meta.cookie.value, sid)
  t.end()
})
