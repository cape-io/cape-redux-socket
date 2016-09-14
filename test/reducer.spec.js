import test from 'tape'

import reducer, { connect } from '../src'

test('connect', t => {
  const action = connect({ sessionId: 'a12b34' })
  const state = reducer(undefined, action)
  t.equal(state.sessionId, 'a12b34')
  t.equal(state.connect, true)
  t.end()
})
