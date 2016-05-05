# cape-redux-socket

[![Build Status](https://travis-ci.org/cape-io/cape-redux-socket.svg?branch=master)](https://travis-ci.org/cape-io/cape-redux-socket)

### Configure store
```javascript
import io from 'socket.io-client'
import {
  addCookieMeta, cookieMiddleware, middleware as createSocketMiddleware
} from 'cape-redux-socket'
const location = process.env.SOCKET_LOC || ''
const socket = createSocketMiddleware(io(location), { getEmitAction: addCookieMeta })
const middleware = [
  cookieMiddleware,
  socket,
]
```

### Reducer
```javascript
export socket, { idReducer as id } from 'cape-redux-socket'
```
