import React, { useContext } from "react";
import { Button, Flex, Text } from "@theme-ui/components";
import OptionSelector from "./option-selector";
import OrderContext from "../../../context/order-context";
import { getFrom } from "../../../utils/get-from";

const Info = ({ product }) => {
  const { selectedRegion, createCart } = useContext(OrderContext);
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "space-between",
        pl: "3em",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
        }}
      >
        <Text
          sx={{
            fontSize: ".75em",
            fontWeight: "500",
            mb: "1em",
          }}
        >
          {`${getFrom(product.variants, {
            currency_code: selectedRegion.currency_code,
            tax_rate: selectedRegion.tax_rate,
          })}`}
        </Text>
        <Text variant="fz_s">{product.description}</Text>
        <OptionSelector product={product} />
      </Flex>
      <Button onClick={() => createCart()} variant="cta">
        Buy now
      </Button>
    </Flex>
  );
};

export default Info;
