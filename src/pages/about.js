import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"
import { rhythm, scale } from "../utils/typography"

class AboutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { oldPost: props.data.markdownRemark }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.markdownRemark) {
      this.setState({ oldPost: nextProps.data.markdownRemark })
    }
  }

  render() {
    const { data } = this.props
    const post = data.markdownRemark || this.state.oldPost
    const siteTitle = data.site.siteMetadata.title
    const { siteUrl, keywords } = data.site.siteMetadata
    const ogpImage = `${siteUrl}${data.ogp.childImageSharp.fixed.src}`
    const url = `${siteUrl}${post.fields.slug}`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          url={url}
          image={ogpImage}
          keywords={keywords}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <Tags tags={post.frontmatter.tags} />
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer />
        </article>
      </Layout>
    )
  }
}

export default AboutPage

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
    markdownRemark(fields: { slug: { eq: "/about" } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
      fields {
        slug
      }
    }
  }
`
