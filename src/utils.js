import defaultTo from 'lodash/fp/defaultTo'
import flow from 'lodash/flow'
import identical from 'lodash/fp/eq'
import over from 'lodash/over'
import property from 'lodash/property'
import spread from 'lodash/spread'

export const isFalse = identical(false)

export function select(selector, path, defaultValue = null) {
  if (defaultValue) return flow(selector, property(path), defaultTo(defaultValue))
  return flow(selector, property(path))
}
export function simpleSelector(...funcs) {
  const last = funcs.pop()
  return flow(over(funcs), spread(last))
}
// Trigger a call to onChange() when result of selector changes.
export function addListener(selector, onChange, store) {
  const { getState, subscribe } = store
  let currentValue = selector(getState())
  function handleChange() {
    const previousValue = currentValue
    currentValue = selector(getState())
    if (previousValue !== currentValue) {
      onChange(store, currentValue)
    }
  }
  return subscribe(handleChange)
}