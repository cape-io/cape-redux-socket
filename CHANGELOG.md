## 2.2.1

* Tests and bug fixes.
* Added `sid` to cookie within `connected()` action.
* Cleaned up cookie.js
* Added `hasCookie()` to lang.js

## 2.2.0

Code refactor. sessionIdListener(store, onChange)

## 2.0.0

Split cookie handling code into its own middleware. Handle meta.cookie of any action regardless of socket. @TODO should/could be split into its own module. Restructure module files.

## 1.2.0

Allow `action.meta.sendSocket === false` to disable socket emit.

## 1.1.2
> 2016-02-18

* Save actions with meta.cookie to browser cookie. Added `cookies-js` dependency. If you don't want it please make a `redux-cookie` module specific to that use case.
* Pass cookieJar as `cookie` meta to server.
