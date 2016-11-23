import property from 'lodash/property'

import { select } from 'cape-select'

export const getSocket = property('socket')
export const getSessionId = select(getSocket, 'sessionId')
export const getPresenter = select(getSocket, 'presenter')
export const isReconnected = select(getSocket, 'reconnected')
