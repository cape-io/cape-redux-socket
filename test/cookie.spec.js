import test from 'tape'

import { cookieMiddleware } from '../src'

test('cookieMiddleware', t => {
  const action = { type: 'THING', payload: 'foo' }
  t.plan(1)
  function next(act) {
    t.deepEqual(act, action)
  }
  cookieMiddleware()(next)(action)
  t.end()
})
