import test from 'tape'
import constant from 'lodash/constant'

import {
  allowEmit, doEmitAction, doEmitEvent, getEventBody, getSendSocket, noPresenter, validAction,
} from '../src/lang'

import { invalid, send1, send2, send3, halt1, halt2, state, state2 } from './mock'

test('getSendSocket', (t) => {
  t.equal(getSendSocket(send1), undefined, 'undefined when sendSocket not set.')
  t.equal(getSendSocket(send2), 'foo', 'sendSocket string')
  t.equal(getSendSocket(send3), 'bar', 'meta.sendSocket string')
  t.equal(getSendSocket(halt1), false, 'find false on sendSocket')
  t.equal(getSendSocket(halt2), false, 'find false on meta.sendSocket')
  t.end()
})
test('getEventBody', (t) => {
  t.equal(getEventBody(send2), send2.payload, 'sendSocket string')
  t.equal(getEventBody(send3), 'coffee', 'meta.sendSocket string') // BROKEN
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
  t.false(doEmitAction(send2, store), 'not when emitSocket string')
  t.false(doEmitAction(halt1, store), 'emitSocket false')
  store.getState = gs2
  t.false(doEmitAction(send1, store), 'presenter prevent send')
  t.false(doEmitAction(halt1, store), 'emitSocket false')
  t.end()
})
test('doEmitEvent', (t) => {
  t.false(doEmitEvent(send1), 'no sendSocket')
  t.false(doEmitEvent(halt1), 'invalid1')
  t.false(doEmitEvent(halt2), 'invalid2')
  t.true(doEmitEvent(send2), 'sendSocket string')
  t.end()
})
