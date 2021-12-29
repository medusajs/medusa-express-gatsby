import { Card, Flex } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { client } from "../../utils/client"
import OrderConfirmation from "../steps/order-confirmation"
import Layout from "./layout"

const CompletedLayout = () => {
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
    <Layout>
      <Card variant="container">
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
        ></Flex>
      </Card>
    </Layout>
  )
}

export default CompletedLayout
