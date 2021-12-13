import React, { useEffect, useState } from "react"
import { Card, Flex, Text, Link, Box } from "@theme-ui/components"

import { client } from "../../utils/client"

import OrderConfirmation from "../order-completer/order-confirmation"
import LayoutTest from "./layout"
import Logo from "./logo"

const Layout = () => {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams.get("id")
    client.orders.retrieve(id).then(({ order: res }) => setOrder(res))
  }, [])

  if (!order) {
    return null
  }

  return (
    <LayoutTest>
      <Box>
        <OrderConfirmation order={order} />
        <Flex
          pt={4}
          sx={{
            flexDirection: ["column", "row"],
            fontSize: "12px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex>
            <Link variant="text.termsLink" href="#">
              Terms & Conditions
            </Link>
            <Text sx={{ mx: "1rem" }}>•</Text>
            <Link variant="text.termsLink" href="#">
              Privacy Policy
            </Link>
          </Flex>
          <Text sx={{ display: ["none", "block"], mx: "1rem" }}>•</Text>
          <Flex>
            <Link variant="text.termsLink" href="#">
              Shipping & Delivery
            </Link>
            <Text sx={{ mx: "1rem" }}>•</Text>
            <Link variant="text.termsLink" href="mailto:#">
              contact
            </Link>
          </Flex>
        </Flex>
      </Box>
    </LayoutTest>
  )
}

export default Layout
