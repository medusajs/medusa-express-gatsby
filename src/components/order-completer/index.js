import React, { useContext, useState, useEffect } from "react"
import { Flex } from "@theme-ui/components"
import { navigate } from "gatsby"

import OrderContext from "../../context/order-context"
import Forms from "./forms"
import BreadCrumbs from "../breadcrumbs"
import OrderConfirmation from "./order-confirmation"
import Spinner from "./spinner"

const OrderCompleter = ({ country, region }) => {
  const { order, orderStatus } = useContext(OrderContext)

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
      {(showSpinner || order) && (
        <Flex
          sx={{
            position: "absolute",
            bg: "#ffffffaa",
            top: 0,
            left: 0,
            zIndex: 10,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </Flex>
      )}
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
    </Flex>
  )
}

export default OrderCompleter
