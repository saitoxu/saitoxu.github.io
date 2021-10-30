import React from "react"
import { Link, graphql } from "gatsby"
// import AdSense from "react-adsense"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"
import Ad from '../components/ad'
import { rhythm, scale } from "../utils/typography"

import 'katex/dist/katex.min.css'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    // NOTE: たまにprops.data.markdownRemarkがnullになりエラーになるため,
    // 前の内容をstateにキャッシュしておく
    // ref. https://github.com/gatsbyjs/gatsby/issues/11183
    this.state = { oldPost: props.data.markdownRemark, adLoadFailed: false }
  }

  componentDidMount() {
    // hatena bookmark
    (function() {
      var a = document.createElement('script')
      a.async = true
      a.src = 'https://b.st-hatena.com/js/bookmark_button.js'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(a, s)
    })()

    // twitter
    window.twttr.widgets.load(this.refs.tweetButton)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.markdownRemark) {
      this.setState({ oldPost: nextProps.data.markdownRemark })
    }
  }

  onAdLoaded = (target) => {
    this.setState({ adLoadFailed: target.clientHeight === 0 })
  }

  render() {
    const { oldPost, adLoadFailed } = this.state
    const post = this.props.data.markdownRemark || oldPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next } = this.props.pageContext
    const keywords = post.frontmatter.tags
    const ogpImage = `https://res.cloudinary.com/saitoxu/image/upload/l_text:NotoSansJP-Bold.otf_50:${post.frontmatter.title},co_rgb:333,w_1000,c_fit/v1585389194/blog_ogp_bg.png`
    const url = `${siteUrl}${post.fields.slug}`
    const shareSuffix = ' | saitoxu.io (@saitoxu)'

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
                lineHeight: 1.2,
                marginBottom: rhythm(0.6)
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <a
              ref="tweetButton"
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${post.frontmatter.title}${shareSuffix}`}
            >
              Tweet
            </a>
            <div style={{ width: 10 }} />
            <a
              href="https://b.hatena.ne.jp/entry/"
              className="hatena-bookmark-button"
              data-hatena-bookmark-layout="basic-label-counter"
              data-hatena-bookmark-lang="ja"
              title="このエントリーをはてなブックマークに追加"
            >
              <img
                src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
                alt="このエントリーをはてなブックマークに追加"
                width="20"
                height="20"
                style={{ border: "none" }}
              />
            </a>
          </div>
          <Ad onLoad={this.onAdLoaded} />
          {adLoadFailed && <div style={{ height: '280px'}} />}
          <div style={{ marginBottom: rhythm(1) }} />
          <hr style={{ marginBottom: rhythm(1) }} />
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
              marginLeft: 0,
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
      fields {
        slug
      }
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
