import defaultTo from 'lodash/defaultTo'
import flow from 'lodash/flow'
import isString from 'lodash/isString'
import negate from 'lodash/negate'
import over from 'lodash/over'
import overEvery from 'lodash/overEvery'
import property from 'lodash/property'
import result from 'lodash/fp/result'
import spread from 'lodash/spread'

import { getPresenter } from './select'
import { isFalse } from './utils'

export const getSendSocket = flow(
  over([ property('sendSocket'), property('meta.sendSocket') ]),
  spread(defaultTo)
)
// Require sendSocket to not be a strict false.
export const allowEmit = flow(getSendSocket, negate(isFalse))
// We do not care about any action without type prop set.
export const validAction = overEvery([ property('type'), allowEmit ])
export const noPresenter = flow(result('getState'), getPresenter, negate(isString))
export function doEmitAction(action) {
  return overEvery([ validAction, noPresenter(action) ])
}
export const sendIsString = flow(getSendSocket, isString)
export const doEmitEvent = overEvery([ validAction, sendIsString ])
