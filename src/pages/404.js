import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { siteUrl, keywords } = data.site.siteMetadata
    const ogpImage = `${siteUrl}${data.ogp.childImageSharp.fixed.src}`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="404 Not Found"
          url={siteUrl}
          image={ogpImage}
          keywords={keywords}
        />
        <h1 style={{ textAlign: 'center', marginBottom: 160 }}>404 Not Found <span role="img" aria-label="monkey">🙈</span></h1>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
        keywords
      }
    }
    ogp: file(absolutePath: { regex: "/content/assets/ogp.png/" }) {
      childImageSharp {
        fixed(width: 1200, height: 630) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
