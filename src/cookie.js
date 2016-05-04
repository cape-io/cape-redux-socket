import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'
import Cookies from 'js-cookie'

// Look in action.meta for cookie.
function setSid(meta) {
  const { name, value, options } = meta.cookie
  if (value) {
    Cookies.set(name, value, options)
  } else {
    Cookies.remove(name, options)
  }
  // Remove the cookie from the action. Do not send it along to other middleware or reducers.
  delete meta.cookie // eslint-disable-line no-param-reassign
}

export function addCookieMeta(action) {
  const cookieJar = Cookies.get()
  if (isEmpty(cookieJar)) return action
  // Add cookie information to action sent to server.
  return merge({}, action, { meta: { cookie: cookieJar } })
}

// Look into every action for meta.cookie.
export function cookieMiddleware() {
  return () => next => action => {
    if (action.meta && action.meta.cookie) {
      setSid(action.meta)
    }
    next(action)
  }
}
