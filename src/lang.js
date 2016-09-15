import flow from 'lodash/flow'
import get from 'lodash/get'
import isString from 'lodash/isString'
import negate from 'lodash/negate'
import overEvery from 'lodash/overEvery'
import property from 'lodash/property'
import result from 'lodash/fp/result'

import { getPresenter } from './select'
import { isFalse } from './utils'

export function getSendSocket({ sendSocket, meta }) {
  return sendSocket || get(meta, 'sendSocket')
}
// Require sendSocket to not be a strict false.
export const allowEmit = flow(getSendSocket, negate(isFalse))
export const sendIsString = flow(getSendSocket, isString)
// We do not care about any action without type prop set.
export const validAction = overEvery([ property('type'), allowEmit ])
export const noPresenter = flow(result('getState'), negate(getPresenter))
export function doEmitAction(action) {
  return overEvery([ validAction, noPresenter(action) ])
}
export const doEmitEvent = overEvery([ validAction, sendIsString ])
