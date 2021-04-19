import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const PostTemplate = ({ data: post }) => (
  <Layout>
    <h1>{post.markdownRemark.frontmatter.title}</h1>
    <h4>{post.markdownRemark.timeToRead}</h4>
    <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
  </Layout>
)

// this gets passed to PostTemplate - but how, where?
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      timeToRead
    }
  }
`

export default PostTemplate
