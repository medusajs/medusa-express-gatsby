import React, { useContext } from "react"
import { Flex, Text } from "@theme-ui/components"

import OrderContext from "../../context/order-context"

const BreadCrumbs = ({ sx, step }) => {
  const { destroyCart } = useContext(OrderContext)

  const inBreadcrumbs = {
    flex: "none",
    flexGrow: 1,
    fontWeight: 300,
    fontSize: "10px",
    letterSpacing: "0.1em",
    color: "#B0B0B0",
    mr: 1,
  }

  const visited = {
    cursor: "pointer",
    flex: "none",
    flexGrow: 1,
    fontWeight: 300,
    fontSize: "10px",
    letterSpacing: "0.1em",
    color: "#454545",
    mr: 1,
  }

  return (
    <Flex sx={sx}>
      <Text onClick={() => destroyCart()} sx={visited}>
        Product
      </Text>
      <Text sx={step > 0 ? visited : inBreadcrumbs}>></Text>
      <Text sx={step > 0 ? visited : inBreadcrumbs}>Your order</Text>
      <Text sx={step > 1 ? visited : inBreadcrumbs}>></Text>
      <Text sx={step > 1 ? visited : inBreadcrumbs}>Payment</Text>
    </Flex>
  )
}

export default BreadCrumbs
