import {
  flow, isString, negate, nthArg, overEvery, property, unary,
} from 'lodash'
import has from 'lodash/fp/has'
import result from 'lodash/fp/result'
import { isFalse, getDefault } from 'cape-lodash'

import { getPresenter } from './select'
// Get sendSocket or meta.sendSocket.
export const getSendSocket = getDefault('meta.sendSocket', 'sendSocket')
// The content to send on the custom emit type.
export const getEventBody = getDefault('meta.emit', 'payload')

// Require sendSocket to not be a strict false.
export const allowEmit = flow(getSendSocket, negate(isFalse))
// We do not care about any action without type prop set.
export const validAction = unary(overEvery([ property('type'), allowEmit ]))
// Check the 2nd argument for getState().presenter. Make sure it's not a string.
export const noPresenter = flow(nthArg(1), result('getState'), getPresenter, negate(isString))
// Check if sendSocket is a string.
export const sendIsString = unary(flow(getSendSocket, isString))
// Send it action and store as params. Will return if action should be sent to server.
export const doEmitAction = overEvery([ validAction, noPresenter, negate(sendIsString) ])
// Is this a custom emit event that should be sent to the server?
export const doEmitEvent = overEvery([ validAction, sendIsString ])
// Pass it an action. Returns true if it has a cookie.
export const hasCookie = has('meta.cookie.name')
