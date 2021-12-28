import { Box, Divider, Flex, Text } from "@theme-ui/components";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "theme-ui";
import OrderContext from "../../context/order-context";
import { client } from "../../utils/client";
import ProductDisplay from "./product-display";

const ProductSelection = ({ product, region, country, nextStep }) => {
  const { createCart, status } = useContext(OrderContext);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    client.products.retrieve(product.id).then(({ product: details }) => {
      const inventoryObj = details.variants.reduce((acc, next) => {
        acc[next.id] = next.inventory_quantity;
        return acc;
      }, {});

      setInventory(inventoryObj);
    });
  }, [product]);

  const handleSubmit = () => {
    createCart(region.id, country).finally(() => nextStep());
  };

  return (
    <Box>
      <Text variant="header3">Product</Text>
      <Flex sx={{ mt: "16px", justifyContent: "center" }}>
        <ProductDisplay
          showSpinner={status === "creating_cart"}
          region={region}
          product={product}
        />
      </Flex>
      <Divider sx={{ color: "#E5E7EB", my: "16px" }} />
      <Button sx={{}} onClick={() => handleSubmit()} variant="cta">
        Continue
      </Button>
    </Box>
  );
};

export default ProductSelection;
