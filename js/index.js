/** @jsx h */

import { h, render, Component } from 'preact'

class Archive extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)

    const postDates = JSON.parse(document.getElementById('archive-data').value)
    const archives = []
    postDates.forEach((post, i) => {
      const yearAndMonth = post.split('-').filter((s) => {
        return s.length === 4 || s.length == 2
      })
      const year = yearAndMonth[0]
      const month = yearAndMonth[1]

      const lastIndex = archives.length - 1
      if (archives[lastIndex] === undefined) {
        // 最初
        archives.push({ year, size: 1, open: true, months: [{ month, size: 1 }] })
      } else if (archives[lastIndex].year !== year) {
        // 年の変わり目
        archives.push({ year, size: 1, open: false, months: [{ month, size: 1 }] })
      } else if (archives[lastIndex].months[archives[lastIndex].months.length - 1].month !== month) {
        // 月の変わり目
        archives[lastIndex].size += 1
        archives[lastIndex].months.push({ month, size: 1 })
      } else {
        // その他
        archives[lastIndex].size += 1
        const lastMonthIndex = archives[lastIndex].months.length - 1
        archives[lastIndex].months[lastMonthIndex].size += 1
      }
    })
    this.state = { archives }
  }

  handleClick(e) {
    e.preventDefault()
    const index = parseInt(e.target.dataset.archiveIndex)
    const archives = [].concat(this.state.archives)
    archives[index].open = !archives[index].open
    this.setState({ archives })
  }

  renderArchives(archives) {
    const archiveList = []
    archives.forEach((archive, i) => {
      const caret = archive.open ? 'fa-chevron-down' : 'fa-chevron-right'
      const dom = (
        <div>
          <h5 key={i}><i data-archive-index={i} class={`button fa ${caret}`} aria-hidden="true" onClick={this.handleClick} /> {archive.year} ({archive.size})</h5>
          {archive.open && this.renderMonthArchives(archive.year, archive.months)}
        </div>
      )
      archiveList.push(dom)
    })
    return archiveList
  }

  renderMonthArchives(year, months) {
    const archives = []
    months.forEach((month, i) => {
      archives.push(<h5 key={i}>{year} / {month.month} ({month.size})</h5>)
    })
    return <div class="months">{archives}</div>
  }

  render() {
    const { archives } = this.state
    return (
      <div>
        {this.renderArchives(archives)}
      </div>
    )
  }
}

window.addEventListener('DOMContentLoaded', () => {
  render(<Archive />, document.getElementById('archive'))
})
