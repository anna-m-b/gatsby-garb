import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

const GET_IMAGEDATA = graphql`
  query SiteImagesQuery {
    allFile {
      edges {
        node {
          relativePath
          name
          prettySize
          birthTime
        }
      }
    }
  }
`

const Page3 = () => {
  const data = useStaticQuery(GET_IMAGEDATA)
  return (
    <Layout>
      <h1>Image File Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Relative Path</th>
            <th>Size</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.name}</td>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
              <td>{node.birthTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/">Go Home</Link>
    </Layout>
  )
}

export default Page3
