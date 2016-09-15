import test from 'tape'

import { isFalse, simpleSelector } from '../src/utils'

import { getSessionId, getPresenter } from '../src/select'

import { change, state2 } from './mock'

test('simpleSelector', (t) => {
  function checkAnswer(arg1, arg2, arg3) {
    t.equal(arg1, change.sessionId, 'arg1')
    t.equal(arg2, change.presenter, 'arg2')
    t.end(arg3)
  }
  const simple = simpleSelector(getSessionId, getPresenter, checkAnswer)
  simple(state2)
})
test('isFalse', (t) => {
  t.false(isFalse(true), 'true is not false')
  t.false(isFalse(null), 'null is not false')
  t.true(isFalse(false), 'false is false')
  t.end()
})
