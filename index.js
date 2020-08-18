/* global HTMLElement, customElements */
import { html } from './html.js'

const timelineItem = (item, groupedBy) =>
  groupedBy === 'name' ? html`${item.group} ${item.name}` : html`${item.name} ${item.group}`

const timelineItems = (items, groupedBy) => html`
  <timeling-timeline-items>
    ${items.map(item => timelineItem(item, groupedBy))}
  </timeling-timeline-items>
`

class TimelingTimeline extends HTMLElement {
  constructor () {
    super()

    const rows = html`<timeling-rows></timeling-rows>`
    this.rows = rows
    console.log(this.rows)
    this.appendChild(rows)

    this.rows = this.querySelector('timeling-rows')

    console.log(this.rows)
  }

  connectedCallback () {
    this.rows = this.querySelector('timeling-rows')
    if (this.getAttribute('data')) { // else initialize yourself
      this.initialize(JSON.parse(this.getAttribute('data')))
      this.build()
    }
  }

  build () {
    const data = this.groupedData
    Object.entries(data).map(([group, items]) => {
      this.rows.appendChild(html`<timeling-row>
        <timeling-row-label>${group}</timeling-row-label>
        ${timelineItems(items, this.groupedBy)}
      <timeling-row>`)
    })
  }

  initialize (data) {
    this.data = data
  }

  get data () {
    return this._data || []
  }

  set data (data = []) {
    this._data = data
  }

  get groupedData () {
    return this.dataGroupedBy(this.data, this.groupedBy)
  }

  get groupedBy () {
    return this.getAttribute('group-by') || 'name'
  }

  dataGroupedBy (data, prop) {
    return data.reduce((res, curr) => {
      res[curr[prop]] = res[curr[prop]] || []
      res[curr[prop]].push(curr)
      return res
    }, {})
  }
}

customElements.define('timeling-timeline', TimelingTimeline)
