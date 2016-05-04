import identity from 'lodash/identity'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'

export default function createAction(type, payloadCreator) {
  const getPayload = isFunction(payloadCreator) ? payloadCreator : identity
  return (...args) => {
    const action = { type }
    const payload = getPayload(...args)
    if (!isUndefined(payload)) action.payload = payload
    return action
  }
}
