import test from 'tape'

import { getSendSocket } from '../src/lang'

import { send1, halt1, halt2 } from './mock'

test('getSendSocket', (t) => {
  t.equal(getSendSocket(send1), undefined, 'undefined when sendSocket not set.')
  t.equal(getSendSocket(halt1), false, 'find false on sendSocket')
  t.equal(getSendSocket(halt2), false, 'find false on meta.sendSocket')
  t.end()
})
