import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Steps from "../components/steps"
import { OrderProvider } from "../context/order-context"

const ProductPage = ({ data, pageContext }) => {
  const product = data.medusaProduct

  const regions = data.allMedusaRegion.edges.map(({ node }) => {
    return node
  })

  return (
    <OrderProvider>
      <SEO title={product.title} />
      <Layout regions={regions} country={pageContext.country}>
        <Steps
          product={product}
          regions={regions}
          regionId={pageContext.region_id}
          country={pageContext.country}
        />
      </Layout>
    </OrderProvider>
  )
}

export const query = graphql`
  query($handle: String!) {
    medusaProduct(handle: { eq: $handle }) {
      description
      discountable
      handle
      id
      is_giftcard
      options {
        created_at
        id
        product_id
        title
        updated_at
        values {
          created_at
          id
          option_id
          updated_at
          value
          variant_id
        }
      }
      collection {
        title
      }
      profile_id
      status
      thumbnail
      title
      updated_at
      variants {
        allow_backorder
        created_at
        id
        inventory_quantity
        manage_inventory
        prices {
          amount
          created_at
          currency_code
          id
          updated_at
          variant_id
        }
        options {
          id
          option_id
          value
        }
        product_id
        title
        updated_at
      }
    }

    allMedusaRegion {
      edges {
        node {
          id
          name
          tax_rate
          currency_code
          countries {
            display_name
            iso_2
          }
        }
      }
    }
  }
`

export default ProductPage
