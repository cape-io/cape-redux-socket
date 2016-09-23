import { isEmpty, set, unset } from 'lodash'
import Cookies from 'js-cookie'

import { hasCookie } from './lang'

// Handle action.meta.cookie.
function setCookie(action) {
  const { name, value, options } = action.meta.cookie
  if (value) {
    Cookies.set(name, value, options)
  } else {
    Cookies.remove(name, options)
  }
  // Remove the cookie from the action. Do not send it along to other middleware or reducers.
  // Why should it be removed? Makes things harder to debug.
  unset(action, 'meta.cookie')
  return action
}

export function addCookieMeta(action) {
  const cookieJar = Cookies.get()
  if (isEmpty(cookieJar)) return action
  // Add cookie information to action sent to server.
  return set(action, 'meta.cookie', cookieJar)
}

// Look into every action for meta.cookie.
export function cookieMiddleware() {
  return next => (action) => {
    if (hasCookie(action)) return next(setCookie(action))
    return next(action)
  }
}
