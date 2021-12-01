import React, { useEffect, useState } from "react"
import { Card, Flex, Text, Link } from "@theme-ui/components"

import { client } from "../../utils/client"

import OrderConfirmation from "../order-completer/order-confirmation"

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
    <Flex
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        pt: "2em",
      }}
    >
      <Logo />
      <Card
        sx={{
          bg: "white",
          p: "24px",
          justifyContent: "center",
          transition: "all .2s linear",
        }}
      >
        <OrderConfirmation order={order} />
      </Card>
      <Flex
        sx={{
          flexDirection: ["column", "row"],
          fontSize: "12px",
          color: "medusa80",
          bg: "#F0F0F0",
          width: "100%",
          py: "34px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex sx={{ mb: ["1rem", "0"] }}>
          <Link
            sx={{
              textDecoration: "none",
              color: "medusa80",
            }}
            href="https://teklafabrics.com/terms-and-conditions"
          >
            Terms & Conditions
          </Link>
          <Text sx={{ mx: "1rem" }}>•</Text>
          <Link
            sx={{
              textDecoration: "none",
              color: "medusa80",
            }}
            href="https://teklafabrics.com/terms-and-conditions"
          >
            Privacy Policy
          </Link>
        </Flex>
        <Text sx={{ display: ["none", "block"], mx: "1rem" }}>•</Text>
        <Flex>
          <Link
            sx={{
              textDecoration: "none",
              color: "medusa80",
            }}
            href="https://teklafabrics.com/terms-and-conditions"
          >
            Shipping & Delivery
          </Link>
          <Text sx={{ mx: "1rem" }}>•</Text>
          <Link
            sx={{
              textDecoration: "none",
              color: "medusa80",
            }}
            href="mailto:customercare@teklafabrics.com"
          >
            customercare@teklafabrics.com
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
