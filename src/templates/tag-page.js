import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const TagPageTemplate = ({ data, location, pageContext }) => {
  const url = `${data.site.siteMetadata.siteUrl}${location.pathname}`
  const siteTitle = data.site.siteMetadata.title
  const ogpImage = `${data.site.siteMetadata.siteUrl}${data.ogp.childImageSharp.gatsbyImageData.src}`
  const { keywords } = data.site.siteMetadata
  const tagName = pageContext.slug
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={tagName}
        description={`${tagName}タグを含む記事の一覧ページです`}
        url={url}
        image={ogpImage}
        keywords={keywords}
      />
      <div className="top">
        <h1>#{tagName}</h1>
        <p>
          <b>{posts.length}</b>件の投稿があります
        </p>
      </div>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`query ($slug: String!) {
  site {
    siteMetadata {
      title
      description
      siteUrl
      keywords
    }
  }
  ogp: file(absolutePath: {regex: "/content/assets/ogp.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 1200, height: 630, layout: FIXED)
    }
  }
  allMarkdownRemark(
    filter: {frontmatter: {tags: {in: [$slug]}}}
    sort: {fields: [frontmatter___date], order: DESC}
    limit: 1000
  ) {
    edges {
      node {
        excerpt(truncate: true)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
}
`
