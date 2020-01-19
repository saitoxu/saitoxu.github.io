import React from "react"
import { Link, graphql } from "gatsby"
import AdSense from "react-adsense"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const { uri } = this.props
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next } = this.props.pageContext
    const keywords = post.frontmatter.tags.join(",")
    const defaultOgpSrc = this.props.data.ogp.childImageSharp.fixed.src
    const ogpImage = `${siteUrl}${
      post.frontmatter.ogp
        ? post.frontmatter.ogp.childImageSharp.fixed.src
        : defaultOgpSrc
    }`

    const url = `${siteUrl}${uri}`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          meta={[
            { property: `og:url`, content: url },
            { property: `og:image`, content: ogpImage },
            { name: `keywords`, content: keywords },
          ]}
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

        <div>
          <AdSense.Google
            key={uri}
            client="ca-pub-9850282304993778"
            slot="1979280137"
            style={{ display: "block" }}
            layout="in-article"
            format="auto"
            responsive
          />
        </div>

        {/* <AdSense.Google
          client="ca-pub-9850282304993778"
          slot="6628204643"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        /> */}

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  ← {next.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    ogp: file(absolutePath: { regex: "/content/assets/ogp.png/" }) {
      childImageSharp {
        fixed(width: 1200, height: 630) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        ogp {
          childImageSharp {
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
