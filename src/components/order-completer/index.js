import React from "react";
import { Flex, Text, Box } from "@theme-ui/components";
import Review from "./review";
import Total from "./total";
import Forms from "./forms";

const OrderCompleter = () => {
  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Text
        as="h2"
        sx={{
          mb: "1em",
        }}
      >
        Your order
      </Text>
      <Review />
      <Total />
      <Box
        sx={{
          height: "1px",
          bg: "cool",
          width: "100%",
          my: "1em",
        }}
      />
      <Forms />
    </Flex>
  );
};

export default OrderCompleter;
