import { Flex, Text } from "@theme-ui/components"
import React, { useContext } from "react"
import OrderContext from "../../context/order-context"

const Total = () => {
  const { cart } = useContext(OrderContext)

  return (
    <Flex
      sx={{
        justifyContent: "space-between",
        mt: "1em",
        mb: "1.25em",
        pb: "1em",
        borderBottom: "2px solid #F0F0F0",
      }}
    >
      <Text>Total</Text>
      <Text sx={{ fontWeight: 600 }}>
        {(cart.total / 100) * (1 + cart.region.tax_rate / 100)}{" "}
        {cart.region.currency_code.toUpperCase()}
      </Text>
    </Flex>
  )
}

export default Total
