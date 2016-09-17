import property from 'lodash/property'
import { createStructuredSelector } from 'reselect'

import { select } from 'cape-select'

export const getSocket = property('socket')
export const getSessionId = select(getSocket, 'sessionId')
export const getPresenter = select(getSocket, 'presenter')
export const connectSelector = createStructuredSelector({ sessionId: getSessionId })
