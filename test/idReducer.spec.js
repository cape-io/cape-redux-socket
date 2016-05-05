import test from 'tape'

import { connected, idReducer } from '../src'

test('idReducer', t => {
  const action = connected('abc123')
  t.equal(idReducer(undefined, action), action.payload.socketId)
  t.equal(idReducer('abc', action), 'abc123')
  t.end()
})
