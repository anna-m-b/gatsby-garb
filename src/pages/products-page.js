import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductsPage = ({ data: { allContentfulProduct } }) => {
  return (
    <Layout>
      <h1>We have {allContentfulProduct.totalCount} fabulous highlighters</h1>

      {allContentfulProduct.edges.map(({ node: product }) => {
        const image = getImage(product.image)
        return (
          <div key={product.contentful_id}>
            <Link to={product.slug}>
              <h2>{product.name}</h2>{" "}
            </Link>
            <h4>{product.price}</h4>
            <GatsbyImage alt={product.name} image={image} />
            <h4>{product.description}</h4>
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulProduct {
      totalCount
      edges {
        node {
          name
          price
          description
          slug
          contentful_id
          image {
            gatsbyImageData(placeholder: BLURRED, width: 400)
          }
        }
      }
    }
  }
`

export default ProductsPage
