const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require(`slugify`)
// const relatedPost = require(`./gatsby-related-posts`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagPage = path.resolve(`./src/templates/tag-page.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { slug: { ne: "/about" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    // const relatedPosts = relatedPost.extractRelatedPosts(
    //   posts,
    //   post,
    //   relatedPost.defaultConfig
    // )

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        // relatedPosts,
        previous,
        next,
      },
    })
  })

  const tagListTemp = []
  posts.forEach(post => {
    const tags = post.node.frontmatter.tags
    if (tags) {
      tags.forEach(tag => {
        tagListTemp.push(tag)
      })
    }
  })
  // 被ってるタグを削除して配列に再変換
  const tagList = Array.from(new Set(tagListTemp))
  // タグページ生成
  if (tagList.length > 0) {
    tagList.forEach(tag => {
      createPage({
        path: `/tags/${slugify(tag, {
          remove: /[*+~.()'"!:@]/g,
          lower: true,
        })}`,
        component: tagPage,
        context: {
          slug: tag,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode, trailingSlash: false })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
