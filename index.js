/* global HTMLElement, customElements */
import { dom } from './dom.js'

const timelineItem = (item, groupedBy) => `
  ${groupedBy === 'name' ? dom`${item.group} ${item.name}` : dom`${item.name} ${item.group}`}
`

const timelineItems = (items, groupedBy) => dom`
  <timeling-timeline-items>
    ${items.map(item => timelineItem(item, groupedBy))}
  </timeling-timeline-items>
`

class TimelingTimeline extends HTMLElement {
  constructor () {
    super()

    this.rows = dom`<timeling-rows></timeling-rows>`
    this.appendChild(this.rows)
  }

  connectedCallback () {
    if (this.getAttribute('data')) { // else initialize yourself
      this.initialize(JSON.parse(this.getAttribute('data')))
      this.build()
    }
  }

  build () {
    const data = this.groupedData

    Object.entries(data).map(([group, items]) => {
      this.appendChild(dom`<timeling-row>
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
