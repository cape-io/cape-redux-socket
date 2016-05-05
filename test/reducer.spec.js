import test from 'tape'

import reducer, { connect } from '../src'

test('connect', t => {
  const action = connect('a12b34')
  const state = reducer(undefined, action)
  t.equal(state.sessionId, 'a12b34')
  t.equal(state.connected, true)
  t.end()
})
