import React, { useState, useContext, useEffect } from "react";
import { Box, Flex, Text } from "@theme-ui/components";
import OrderContext from "../../context/order-context";
import RegionSelector from "./region-selector";
import ProductDisplay from "./product-display";
import { client } from "../../utils/client";

const ProductSelection = ({ product, region, regions, country  }) => {
  const { createCart, status, variant } = useContext(OrderContext);
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

  return (
    <Box>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: "1em",
        }}
      >
        <Text variant="header3">{product.title}</Text>
        <RegionSelector 
          selected={country}
          regions={regions}
        />
      </Flex>
      <Flex>
        <ProductDisplay product={product} />
      </Flex>
    </Box>
  );
};

export default ProductSelection;
