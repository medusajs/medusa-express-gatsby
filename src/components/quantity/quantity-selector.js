import { Button, Flex, Text } from "@theme-ui/components";
import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  const updateQuantity = (update) => {
    const newQuantity = quantity + update;

    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Flex
      sx={{
        alignItems: "center",
      }}
    >
      <Button onClick={() => updateQuantity(-1)}>–</Button>
      <Text
        sx={{
          width: "50px",
          textAlign: "center",
        }}
      >
        {quantity}
      </Text>
      <Button onClick={() => updateQuantity(1)}>+</Button>
    </Flex>
  );
};

export default QuantitySelector;
