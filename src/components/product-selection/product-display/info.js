import React, { useContext } from "react"
import { Button, Flex, Text } from "@theme-ui/components"
import OptionSelector from "./option-selector"
import OrderContext from "../../../context/order-context"
import { getFrom } from "../../../utils/get-from"

const Info = ({ product }) => {
  const { selectedRegion, createCart } = useContext(OrderContext)
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
            fontWeight: "430",
            mb: "1em",
          }}
        >
          <Text mr={2} sx={{ color: "#B0B0B0" }}>
            From
          </Text>
          {`${getFrom(product.variants, {
            currency_code: selectedRegion.currency_code,
            tax_rate: selectedRegion.tax_rate,
          })}`}
        </Text>
        <Text
            my={1}
sx={{
            fontSize: ".75em",
            fontWeight: "400",
          }}
          variant="fz_s"
        >
          {product.description}
        </Text>
        <OptionSelector product={product} />
      </Flex>
    </Flex>
  )
}

export default Info
