import defaultTo from 'lodash/defaultTo'
import flow from 'lodash/flow'
import isString from 'lodash/isString'
import negate from 'lodash/negate'
import nthArg from 'lodash/nthArg'
import over from 'lodash/over'
import overEvery from 'lodash/overEvery'
import property from 'lodash/property'
import result from 'lodash/fp/result'
import spread from 'lodash/spread'
import unary from 'lodash/unary'

import { getPresenter } from './select'
import { isFalse } from './utils'

export const getSendSocket = flow(
  over([ property('sendSocket'), property('meta.sendSocket') ]),
  spread(defaultTo)
)
// Require sendSocket to not be a strict false.
export const allowEmit = flow(getSendSocket, negate(isFalse))
// We do not care about any action without type prop set.
export const validAction = unary(overEvery([ property('type'), allowEmit ]))
export const noPresenter = flow(nthArg(1), result('getState'), getPresenter, negate(isString))
export const doEmitAction = overEvery([ validAction, noPresenter ])
export const sendIsString = flow(getSendSocket, isString)
export const doEmitEvent = overEvery([ validAction, sendIsString ])
