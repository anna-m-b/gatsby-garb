const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

const PostTemplate = path.resolve("./src/templates/post-template.js")
const BlogTemplate = path.resolve("./src/templates/blog-template.js")
// this will create a fields field on the node field with a slug field attached that we can query with GraphQl.
// the value of the slug will be the path name e.g.  /post-one/
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  posts.forEach((_, index, postsArr) => {
    const totalPages = postsArr.length
    const postsPerPage = 1
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        totalPages,
        currentPage,
      },
    })
  })
}
