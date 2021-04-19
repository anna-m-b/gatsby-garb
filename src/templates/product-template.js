import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductTemplate = ({ data: { contentfulProduct } }) => {
  const image = getImage(contentfulProduct.image)
  return (
    <Layout>
      <div>
        <h2>{contentfulProduct.name} </h2>
        <h3>£{contentfulProduct.price}</h3>
        <p>{contentfulProduct.description}</p>
        <GatsbyImage alt={contentfulProduct.name} image={image} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      name
      price
      description
      createdAt(formatString: "MMMM Do, YYYY")
      image {
        gatsbyImageData
      }
    }
  }
`

export default ProductTemplate
