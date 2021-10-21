const { client } = require("./src/utils/client");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const products = await client.products
    .list()
    .then((response) => response.products);

  for (const product of products) {
    // NEED OPTIONS ON DEFAULT RELATIONS

    let { variants, ...rest } = product;
    let completeVariants = [];

    for (const variant of variants) {
      const data = await client.products.variants
        .retrieve(variant.id)
        .then((response) => response.variant);
      completeVariants.push(data);
    }

    variants = completeVariants;

    createNode({
      variants,
      ...rest,
      children: [],
      internal: {
        type: "MedusaProduct",
        contentDigest: createContentDigest(product),
      },
    });
  }
};

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
    }
  `);
  data.allMedusaProduct.edges.forEach((edge) => {
    const handle = edge.node.handle;
    actions.createPage({
      path: handle,
      component: require.resolve(`./src/templates/product-page.js`),
      context: { handle: handle },
    });
  });
};
