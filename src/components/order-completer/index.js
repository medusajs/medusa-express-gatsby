import React, { useContext, useState, useEffect } from "react"
import { Flex, Text, Box } from "@theme-ui/components"
import { navigate } from "gatsby"

import OrderContext from "../../context/order-context"
import Review from "./review"
import Total from "./total"
import Forms from "./forms"
import BreadCrumbs from "../breadcrumbs"
import OrderConfirmation from "./order-confirmation"
import Spinner from "./spinner"

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
      {showSpinner ? (
        <Flex
          sx={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minWidth: ["200px", "500px"],
            height: "100%",
            minHeight: ["150px", "200px"],
          }}
        >
          <Spinner done={done} />
        </Flex>
      ) : order ? (
        <OrderConfirmation order={order} />
      ) : (
        <>
          <Flex pt={3} pb={4}>
            <BreadCrumbs
              step={1}
              sx={{
                alignItems: "center",
              }}
            />
          </Flex>
          <Forms region={region} country={country} />
        </>
      )}
    </Flex>
  )
}

export default OrderCompleter
