/* global QUnit */
import { dom } from '../dom.js'

QUnit.test('render simple node', assert => {
  const elem = dom`<span>hello, world</span>`

  assert.strictEqual(elem.querySelector('span').innerHTML, 'hello, world')
})

QUnit.test('render template with args', assert => {
  const subject = 'world'
  const elem = dom`<span>hello, ${subject}</span>`

  assert.strictEqual(elem.querySelector('span').innerHTML, 'hello, world')
})
