import React from "react"
import { graphql, Link } from "gatsby"
import "./blog.css"

import Layout from "../components/layout"

const BlogTemplate = ({ data, pageContext }) => {
  console.log(pageContext)
  const { allMarkdownRemark } = data
  const { currentPage, isFirstPage, isLastPage, totalPages } = pageContext
  console.log({ totalPages }, { isLastPage })
  const nextPage = `/blog/${currentPage + 1}`
  const prevPage =
    currentPage - 1 === 1 ? `/blog` : `/blog/${String(currentPage - 1)}`

  return (
    <Layout>
      <h4>Total Post Count: {allMarkdownRemark.totalCount}</h4>
      {allMarkdownRemark.edges.map(({ node }) => {
        return (
          <div key={node.id}>
            <h3>
              <Link to={`/posts${node.fields.slug}`}>
                {" "}
                {node.frontmatter.title}{" "}
              </Link>
              {node.frontmatter.date}
            </h3>
            <p>{node.excerpt}</p>
          </div>
        )
      })}
      {/* pagination links */}
      <div className="pagination">
        {!isFirstPage && (
          <Link to={prevPage} rel="prev">
            Prev page
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
            {index + 1}
          </Link>
        ))}
        {!isLastPage && (
          <Link to={nextPage} rel="next">
            Next page
          </Link>
        )}
      </div>
    </Layout>
  )
}

//'to create a new page query' -> see page queries
// Note that you can only have one page query per file.
export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`

export default BlogTemplate
