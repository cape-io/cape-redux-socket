import {
  defaultTo, flow, isString, negate, nthArg, over, overEvery, property, spread, unary,
} from 'lodash'
import result from 'lodash/fp/result'

import { getPresenter } from './select'
import { isFalse } from './utils'
// Get sendSocket or meta.sendSocket. Invalid FSA prop has priority?
export const getSendSocket = flow(
  over([ property('sendSocket'), property('meta.sendSocket') ]),
  spread(defaultTo)
)
// Require sendSocket to not be a strict false.
export const allowEmit = flow(getSendSocket, negate(isFalse))
// We do not care about any action without type prop set.
export const validAction = unary(overEvery([ property('type'), allowEmit ]))
// Check the 2nd argument for getState().presenter.
export const noPresenter = flow(nthArg(1), result('getState'), getPresenter, negate(isString))
// Check if sendSocket is a string.
export const sendIsString = unary(flow(getSendSocket, isString))
// Send it action and store as params. Will return if action should be sent to server.
export const doEmitAction = overEvery([ validAction, noPresenter, negate(sendIsString) ])
// Is this a custom emit event that should be sent to the server?
export const doEmitEvent = overEvery([ validAction, sendIsString ])
