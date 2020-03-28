import React from "react"
import { Link, graphql } from "gatsby"
// import AdSense from "react-adsense"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"
import Ad from '../components/ad'
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    // NOTE: たまにprops.data.markdownRemarkがnullになりエラーになるため,
    // 前の内容をstateにキャッシュしておく
    // ref. https://github.com/gatsbyjs/gatsby/issues/11183
    this.state = { oldPost: props.data.markdownRemark }
  }

  componentDidMount() {
    // Load AddToAny script asynchronously
    // (function() {
    //   var a = document.createElement('script');
    //   a.async = true;
    //   a.src = 'https://static.addtoany.com/menu/page.js';
    //   var s = document.getElementsByTagName('script')[0];
    //   s.parentNode.insertBefore(a, s);
    // })();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.markdownRemark) {
      this.setState({ oldPost: nextProps.data.markdownRemark })
    }
  }

  render() {
    const { uri } = this.props
    const post = this.props.data.markdownRemark || this.state.oldPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next } = this.props.pageContext
    const keywords = post.frontmatter.tags.join(",")
    const ogpImage = `https://res.cloudinary.com/saitoxu/image/upload/l_text:NotoSansJP-Bold.otf_50:${post.frontmatter.title},co_rgb:333,w_1000,c_fit/v1585389194/blog_ogp_bg.png`

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
          {/* <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
            <a class="a2a_dd" href="https://www.addtoany.com/share" />
            <a class="a2a_button_facebook" />
            <a class="a2a_button_twitter" />
            <a class="a2a_button_hatena" />
          </div> */}
          <div style={{ marginBottom: rhythm(1) }}>
            <Ad />
          </div>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer />
        </article>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              marginLeft: 0
            }}
          >
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  ← {next.frontmatter.title}
                </Link>
              )}
            </li>
            <li style={{ width: 10 }} />
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
