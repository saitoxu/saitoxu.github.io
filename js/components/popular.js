/** @jsx h */

import { h, render, Component } from 'preact'
import fetchJsonp from 'fetch-jsonp'

const url = 'http://b.hatena.ne.jp/entrylist/json?url=saitoxu.io&mode=rss&threshold=1&sort=count'

export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = { populars: [] }
  }

  componentDidMount() {
    fetchJsonp(url).then(response => {
      return response.json()
    }).then(json => {
      this.setState({ populars: [].concat(json.slice(0, 5)) })
    }).catch(error => {
      // do nothing
    })
  }

  renderPopulars(populars) {
    return (
      populars.map(popular => {
        const title = popular.title.split(' | ')[0]
        const url = popular.link
        return (
          <h5>
            <a href={url}>{title}</a>
            <span>&nbsp;</span>
            <img src={`http://b.hatena.ne.jp/entry/image/${url}`} />
          </h5>
        )
      })
    )
  }

  render() {
    const { populars } = this.state
    return (
      <div>
        {this.renderPopulars(populars)}
      </div>
    )
  }
}
