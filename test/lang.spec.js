import test from 'tape'
import constant from 'lodash/constant'

import { allowEmit, doEmitAction, getSendSocket, noPresenter, validAction } from '../src/lang'

import { invalid, send1, halt1, halt2, state, state2 } from './mock'

test('getSendSocket', (t) => {
  t.equal(getSendSocket(send1), undefined, 'undefined when sendSocket not set.')
  t.equal(getSendSocket(halt1), false, 'find false on sendSocket')
  t.equal(getSendSocket(halt2), false, 'find false on meta.sendSocket')
  t.end()
})
test('allowEmit', (t) => {
  t.true(allowEmit(send1), 'send1 ok')
  t.false(allowEmit(halt1), 'sendSocket set false prevents send')
  t.false(allowEmit(halt2))
  t.end()
})
test('validAction', (t) => {
  t.true(validAction(send1), 'valid is ok')
  t.false(validAction(invalid), 'no type is false')
  t.false(validAction(halt1), 'no type is false')
  t.false(validAction(halt2), 'no type is false')
  t.false(validAction(), 'undefined, false')
  t.end()
})
const gs1 = constant(state)
const gs2 = constant(state2)
test('noPresenter', (t) => {
  t.true(noPresenter(send1, { getState: gs1 }), 'no presenter')
  t.false(noPresenter(send1, { getState: gs2 }), 'has presenter')
  t.end()
})
test('doEmitAction', (t) => {
  const store = { getState: gs1 }
  t.ok(doEmitAction(send1, store), 'all good')
  t.false(doEmitAction(halt1, store), 'emitSocket false')
  store.getState = gs2
  t.false(doEmitAction(send1, store), 'presenter prevent send')
  t.false(doEmitAction(halt1, store), 'emitSocket false')
  t.end()
})
