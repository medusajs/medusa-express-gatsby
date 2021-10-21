import React from "react";
import { graphql } from "gatsby";
import { OrderProvider } from "../context/order-context";
import Layout from "../components/layout";

const ProductPage = ({ data }) => {
  const product = data.medusaProduct;

  return (
    <OrderProvider>
      <Layout product={product} />
    </OrderProvider>
  );
};

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
  }
`;

export default ProductPage;
