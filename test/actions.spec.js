import test from 'tape'

import { CONNECT, connect, CONNECTED, connected } from '../src'

test('connect', (t) => {
  const action = connect('abc123')
  t.equal(action.type, CONNECT, 'action type')
  t.equal(action.payload, 'abc123')
  t.end()
})

test('connected', (t) => {
  const action = connected('abc123', 'foo')
  t.equal(action.type, CONNECTED, 'action type')
  t.equal(action.payload.socketId, 'abc123')
  t.equal(action.payload.siteId, 'foo')
  t.end()
})
