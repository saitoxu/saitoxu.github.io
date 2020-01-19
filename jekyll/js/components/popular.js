/** @jsx h */

import { h, render, Component } from 'preact'

const url = 'https://cfcaxb39dk.execute-api.ap-northeast-1.amazonaws.com/production'
const options = {
  headers: {
    'x-api-key': 'fB9opPsaIY5Phfc18jeZW4GZThzRbVXKaFO0HW63'
  }
}

export default class Popular extends Component {
  constructor(props) {
    super(props)
    this.state = { populars: [] }
  }

  componentDidMount() {
    fetch(url, options).then(response => {
      return response.json()
    }).then(json => {
      this.setState({ populars: json })
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
            <img src={`https://b.hatena.ne.jp/entry/image/${url}`} />
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
