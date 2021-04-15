import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"

const GET_POSTDATA = graphql`
  {
    allMarkdownRemark {
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

const Blog = () => {
  const data = useStaticQuery(GET_POSTDATA)
  const { allMarkdownRemark } = data
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
    </Layout>
  )
}

export default Blog
