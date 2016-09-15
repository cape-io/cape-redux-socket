import test from 'tape'

import { allowEmit, getSendSocket, noPresenter, validAction } from '../src/lang'

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
test('noPresenter', (t) => {
  t.true(noPresenter({ getState: () => state }), 'no presenter')
  t.false(noPresenter({ getState: () => state2 }), 'has presenter')
  t.end()
})
