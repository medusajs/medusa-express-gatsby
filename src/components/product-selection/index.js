import { Box, Flex, Text } from "@theme-ui/components";
import React from "react";
import RegionSelector from "./region-selector";
import ProductDisplay from "./product-display";

const ProductSelection = ({ product }) => {
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
        <RegionSelector />
      </Flex>
      <Flex>
        <ProductDisplay product={product} />
      </Flex>
    </Box>
  );
};

export default ProductSelection;
