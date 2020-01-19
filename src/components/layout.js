import React from "react"
import { Link } from "gatsby"
import AdSense from "react-adsense"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1),
            marginTop: 0,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            marginTop: 0,
            marginBottom: 0,
            flex: 1,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: rhythm(2),
            flexWrap: "wrap",
          }}
        >
          {header}
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              marginRight: 12,
            }}
            to={`/about`}
          >
            About
          </Link>
          <a
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
              marginRight: 12,
            }}
            href={`https://twitter.com/saitoxu`}
          >
            Twitter
          </a>
          <a
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            href="https://github.com/saitoxu"
          >
            GitHub
          </a>
        </header>
        <main>{children}</main>
        <AdSense.Google
          key={location}
          client="ca-pub-9850282304993778"
          slot="1979280137"
          style={{ display: "block" }}
          layout="in-article"
          format="auto"
          responsive
        />
        <footer>© {new Date().getFullYear()}, Yosuke Saito</footer>
      </div>
    )
  }
}

export default Layout
