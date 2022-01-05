import { Box, Card, Flex, Text } from "@theme-ui/components"
import { navigate } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
import OrderContext from "../../context/order-context"
import PaymentDetails from "../payment/payment"
import Review from "../payment/review"
import Total from "../payment/total"

const DeliveryReview = ({ delivery, displayCountry }) => (
  <Flex
    sx={{
      flexDirection: "column",
      borderBottom: "1px solid #E5E7EB",
      pb: "16px",
      pt: "8px",
    }}
  >
    <Text variant="subheading" sx={{ mb: "8px" }}>
      Delivery
    </Text>
    <Text variant="summary">{delivery.address_1}</Text>
    <Text variant="summary">{`${delivery.postal_code}, ${delivery.city}`}</Text>
    <Text variant="summary">{displayCountry}</Text>
  </Flex>
)

const Payment = ({ region, country, activeStep }) => {
  const [fullCountry, setFullCountry] = useState("")
  const { delivery, setCountryName, order, orderStatus } =
    useContext(OrderContext)
  const [shouldNavigate, setShouldNavigate] = useState(false)

  useEffect(() => {
    if (activeStep === "payment") {
      setFullCountry(
        region.countries.find(c => c.iso_2 === country).display_name
      )
      setCountryName(fullCountry)
    }
  }, [country, region, activeStep])

  useEffect(() => {
    if (orderStatus === "completed") {
      const timeout = setTimeout(() => {
        setShouldNavigate(true)
      }, 200)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [orderStatus])

  useEffect(() => {
    if (shouldNavigate && order?.id) {
      navigate(`/completed?id=${order.id}`)
    }
  }, [order?.id, shouldNavigate])

  return (
    <Flex variant="layout.stepContainer">
      {activeStep === "payment" ? (
        <Card variant="container">
          <Text variant="header3">Payment</Text>
          <Box mt={"16px"}>
            <Review /> <Total />
            <DeliveryReview displayCountry={fullCountry} delivery={delivery} />
            <Flex
              sx={{
                flexDirection: "column",
                py: "16px",
              }}
            >
              <Text variant="subheading" sx={{ mb: "8px" }}>
                Payment method
              </Text>
              <PaymentDetails />
            </Flex>
          </Box>
        </Card>
      ) : (
        <Card variant="accordionTrigger">Payment</Card>
      )}
    </Flex>
  )
}

export default Payment
