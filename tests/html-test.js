/* global QUnit */
import { html } from '../html.js'

QUnit.test('render simple node', assert => {
  const elem = html`<span>hello, world</span>`

  assert.strictEqual(elem.querySelector('span').innerHTML, 'hello, world')
})

QUnit.test('render template with args', assert => {
  const subject = 'world'
  const elem = html`<span>hello, ${subject}</span>`

  assert.strictEqual(elem.querySelector('span').innerHTML, 'hello, world')
})

QUnit.test('render nested template', assert => {
  const string = 'world'
  const subject = html`<p>${string}</p>`
  const elem = html`<span>hello, ${subject}</span>`

  assert.strictEqual(elem.querySelector('span').innerHTML, 'hello, <p>world</p>')
})

QUnit.test('render template with map of templates in it', assert => {
  const list = ['hello', ', ', '<p>world</p>']
  const elem = html`<span>${list.map(s => html`${s}`)}</span>`

  assert.strictEqual(elem.querySelector('span').innerHTML, 'hello, <p>world</p>')
})

QUnit.test('render adjacent html-elements', assert => {
  const elem = html`<span>hello, world</span><span>hello, world</span>`

  assert.strictEqual(elem.querySelectorAll('span').length, 2)
})
QUnit.test('render non-standalone tags', assert => {
  const elem = html`<table><tr>${html`<td>hello</td>`}</tr></table>`

  assert.strictEqual(elem.querySelectorAll('table').length, 1)
  assert.strictEqual(elem.querySelectorAll('td').length, 1)
})
