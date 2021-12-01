const { client } = require("./src/utils/client")

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const products = await client.products
    .list()
    .then((response) => response.products)

  for (const product of products) {
    // NEED OPTIONS ON DEFAULT RELATIONS

    let { variants, ...rest } = product
    let completeVariants = []

    for (const variant of variants) {
      const data = await client.products.variants
        .retrieve(variant.id)
        .then((response) => response.variant)
      completeVariants.push(data)
    }

    variants = completeVariants

    createNode({
      variants,
      ...rest,
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

  data.allMedusaProduct.edges.forEach((edge) => {
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

      data.allMedusaRegion.edges.forEach((edge) => {
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
