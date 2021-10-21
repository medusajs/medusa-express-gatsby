import { Flex, Text } from "@theme-ui/components";
import React, { useContext } from "react";
import OrderContext from "../../context/order-context";

const Total = () => {
  const { cart } = useContext(OrderContext);

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        mt: "1em",
      }}
    >
      <Text>Total</Text>
      <Text>
        {(cart.total / 100) * (1 + cart.region.tax_rate / 100)}{" "}
        {cart.region.currency_code.toUpperCase()}
      </Text>
    </Flex>
  );
};

export default Total;
