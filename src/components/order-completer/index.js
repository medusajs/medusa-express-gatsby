import React, { useContext, useState, useEffect } from "react"
import { Flex, Text, Box } from "@theme-ui/components"
import { navigate } from "gatsby";

import OrderContext from "../../context/order-context"
import Review from "./review"
import Total from "./total"
import Forms from "./forms"

const OrderCompleter = ({ country, region }) => {
  const { cart, order, orderStatus } = useContext(OrderContext)

  const [showSpinner, setShowSpinner] = useState(false)
  const [done, setDone] = useState(false)
  const [shouldNavigate, setShouldNavigate] = useState(false)

  useEffect(() => {
    if (orderStatus === "completing") {
      setShowSpinner(true)
    } else if (orderStatus === "completed") {
      setDone(true)

      const timeout = setTimeout(() => {
        setShouldNavigate(true)
      }, 1000)

      return () => {
        clearTimeout(timeout)
      }
    } else if (orderStatus === "completion_failed") {
      setShowSpinner(false)
    } else {
      setShowSpinner(false)
    }
  }, [orderStatus])

  useEffect(() => {
    if (shouldNavigate && order?.id) {
      navigate(`/completed?id=${order.id}`)
    }
  }, [order?.id, shouldNavigate])

  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Text
        as="h2"
        sx={{
          mb: "1em",
        }}
      >
        Your order
      </Text>
      <Review />
      <Total />
      <Box
        sx={{
          height: "1px",
          bg: "cool",
          width: "100%",
          my: "1em",
        }}
      />
      <Forms />
    </Flex>
  )
}

export default OrderCompleter
