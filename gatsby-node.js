const { client } = require("./src/utils/client")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MedusaProduct implements Node {
      id: ID!
      title: String!
      subtitle: String
      description: String
      handle: String!
      is_giftcard: Boolean!
      status: String!
      images: [MedusaImage]
      thumbnail: String
      options: [MedusaProductOption]!
      variants: [MedusaProductVariant]!
      collection: MedusaCollection
      collection_id: String
      profile_id: String!
      discountable: Boolean!
      published_at: Date!
      created_at: Date!
      updated_at: Date!
      weight: Int
      length: Int
      width: Int
    }
    type MedusaCollection @dontInfer {
      id: ID!
      handle: String!
      title: String!
      created_at: Date!
      updated_at: Date!
    }
    type MedusaProductOption @dontInfer {
      id: ID!
      title: String!
      product_id: String!
      values: [MedusaProductOptionValue]!
      created_at: Date!
      updated_at: Date!
    }
    type MedusaProductOptionValue @dontInfer {
      id: ID!
      value: String!
      created_at: Date!
      updated_at: Date!
      option_id: String!
      variant_id: String!
    }
    type MedusaProductVariant @dontInfer {
      id: ID!
      title: String!
      product_id: String!
      prices: [MedusaMoneyAmount]!
      sku: String
      barcode: String
      upc: String
      variant_rank: Int
      inventory_quantity: Int!
      allow_backorder: Boolean!
      manage_inventory: Boolean!
      hs_code: String
      origin_country: String
      mid_code: String
      material: String
      weight: Int
      length: Int
      height: Int
      width: Int
      options: [MedusaProductOptionValue]!
      created_at: Date!
      updated_at: Date!
    }
    type MedusaMoneyAmount @dontInfer {
      id: ID!
      amount: Int!
      currency_code: String!
      created_at: Date!
      updated_at: Date!
      variant_id: String!
    }
    type MedusaImage @dontInfer {
      id: ID!
      url: String!
      created_at: Date!
      updated_at: Date!
    }
    type MedusaRegion implements Node {
      id: ID!
      name: String!
      tax_rate: Float!
      currency_code: String!
      created_at: Date!
      updated_at: Date!
      countries: [MedusaCountry]!
    }
    type MedusaCountry @dontInfer {
      id: ID!
      display_name: String!
      iso_2: String!
      iso_3: String!
      name: String!
      num_code: Int!
      region_id: String!
    }
  `

  createTypes(typeDefs)
}

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  reporter,
}) => {
  const products = await client.products
    .list()
    .then(response => response.products)
    .catch(_ => {
      reporter.panic(
        "Could not fetch products from Medusa, please ensure that you have a Medusa server running and that you have set the correct BASE_URL in the client."
      )
      return
    })

  for (const product of products) {
    createNode({
      ...product,
      parent: null,
      children: [],
      internal: {
        type: "MedusaProduct",
        contentDigest: createContentDigest(product),
      },
    })
  }

  const { regions } = await client.regions.list()

  for (const region of regions) {
    createNode({
      ...region,
      parent: null,
      children: [],
      internal: {
        type: "MedusaRegion",
        contentDigest: createContentDigest(region),
      },
    })
  }
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMedusaProduct {
        edges {
          node {
            handle
          }
        }
      }
      allMedusaRegion {
        edges {
          node {
            id
            countries {
              iso_2
            }
          }
        }
      }
    }
  `)

  const [first] = data.allMedusaRegion.edges

  data.allMedusaProduct.edges.forEach(edge => {
    const handle = edge.node.handle
    if (handle) {
      actions.createPage({
        path: handle,
        component: require.resolve(`./src/templates/product-page.js`),
        context: {
          handle,
          region_id: first.node.id,
          country: first.node.countries[0].iso_2,
        },
      })

      data.allMedusaRegion.edges.forEach(edge => {
        const { id: regionId, countries } = edge.node
        for (const { iso_2 } of countries) {
          actions.createPage({
            path: `/${iso_2}/${handle}`,
            component: require.resolve(`./src/templates/product-page.js`),
            context: {
              handle,
              region_id: regionId,
              country: iso_2,
            },
          })
        }
      })
    }
  })
}
