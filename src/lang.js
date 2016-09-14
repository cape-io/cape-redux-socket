import identical from 'lodash/fp/eq'
import flow from 'lodash/flow'
import result from 'lodash/result'
import isString from 'lodash/isString'
import negate from 'lodash/negate'
import overEvery from 'lodash/overEvery'
import property from 'lodash/property'

import { getPresenter } from './select'

export const isFalse = identical(false)
export function getSendSocket({ sendSocket, meta }) {
  return sendSocket || result(meta, 'sendSocket')
}
// Prevent socket emit when sendSocket is set to false.
export const allowEmit = flow(getSendSocket, negate(isFalse))
export const sendIsString = flow(getSendSocket, isString)
export const validAction = overEvery([ property('type'), allowEmit ])
export const noPresenter = flow(result('getState'), negate(getPresenter))
export function doEmitAction(action) {
  // We do not care about any action without type prop set.
  // Also check for false sendSocket or presenter.
  return overEvery([ validAction, noPresenter(action) ])
}
export const doEmitEvent = overEvery([ validAction, sendIsString ])
