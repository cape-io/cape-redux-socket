import { defaultState } from '../src/reducer'

export const state = { socket: defaultState }
export const change = { presenter: 'kai', sessionId: 'abc123' }
export const state2 = { socket: defaultState.merge(change) }
