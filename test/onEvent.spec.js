import test from 'tape'
import { isDate, isObject } from 'lodash'

import {
  preventEmitAction, onClientAction, onServerAction, onConnect, onDisconnect, sessionIdListener,
} from '../src/onEvent'
import { connected } from '../src/actions'
import { defaultOptions } from '../src/middleware'

import { invalid, send1, store } from './mock'

test('preventEmitAction', (t) => {
  t.deepEqual(preventEmitAction({}), { meta: { sendSocket: false } })
  t.end()
})
test('onClientAction', (t) => {
  t.plan(2)
  function emit(eventName, act) {
    t.equal(eventName, 'action', 'action')
    t.equal(act, send1)
  }
  onClientAction(store, { emit }, defaultOptions, send1)
  // Do nothin.
  onClientAction(store, { emit }, defaultOptions, invalid)
  onClientAction(store, { emit }, defaultOptions)
})
test('onServerAction', (t) => {
  t.plan(1)
  function dispatch(act) {
    t.deepEqual(act, { ...send1, meta: { sendSocket: false } })
  }
  onServerAction({ dispatch })(send1)
})
test('onConnect', (t) => {
  t.plan(4)
  function dispatch(act) {
    t.equal(act.type, 'socket/CONNECT')
    t.equal(act.payload.sessionId, null)
  }
  onConnect({ ...store, dispatch })()
  store.dispatch(connected('abc'))
  function dispatch2(act) {
    t.equal(act.type, 'socket/CONNECT')
    t.equal(act.payload.sessionId, 'abc')
  }
  onConnect({ ...store, dispatch: dispatch2 })()
})
test('onDisconnect', (t) => {
  t.plan(3)
  function dispatch(act) {
    t.ok(isObject(act))
    t.equal(act.type, 'socket/DISCONNECT')
    t.ok(isDate(new Date(act.payload)))
  }
  onDisconnect({ ...store, dispatch })()
  t.end()
})
