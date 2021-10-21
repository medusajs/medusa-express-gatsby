import React, { useContext, useMemo } from "react";
import OrderContext from "../../context/order-context";
import { Flex, Image, Text } from "@theme-ui/components";

const Review = () => {
  const { cart } = useContext(OrderContext);

  const item = useMemo(() => {
    return cart.items[0];
  }, [cart.items]);

  return (
    <Flex
      sx={{
        alignItems: "top",
      }}
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        sx={{
          height: "70px",
          width: "auto",
          mr: "1em",
          borderRadius: "4px",
        }}
      />
      <Flex
        sx={{
          flexDirection: "column",
          fontWeight: "500",
          fontSize: ".8em",
        }}
      >
        <Text>{`${item.quantity} x ${item.title} – ${item.variant.title}`}</Text>
        <Text
          sx={{
            mt: ".5em",
          }}
        >
          {(item.unit_price / 100) * (1 + cart.region.tax_rate / 100)}{" "}
          {cart.region.currency_code.toUpperCase()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Review;
