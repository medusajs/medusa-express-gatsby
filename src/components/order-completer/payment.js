import React, { useContext, useMemo } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Box, Flex, Text } from "@theme-ui/components"

import OrderContext from "../../context/order-context"

import PaymentForm from "./payment-form"

const STRIPE_KEY =
  process.env.GATSBY_STRIPE_KEY ||
  "pk_test_51J2gafDoyH7ENvmSIrXyISgjWYzP0pXnZ0qkSN9PlNubSUGzDyOIVBgjO8mnCiPZSG9PY2Juk2rH07NKAedvf9OW00JUyBsDva"
const stripePromise = loadStripe(STRIPE_KEY)

const Payment = () => {
  const { cart } = useContext(OrderContext)

  const stripeSession = useMemo(() => {
    if (cart.payment_sessions) {
      return cart.payment_sessions.find((s) => s.provider_id === "stripe")
    }

    return null
  }, [cart.payment_sessions])

  if (!stripeSession) {
    return null
  }

  const options = {
    client_secret: stripeSession.data.client_secret,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <Box mb={3}>
        <Text variant="subheading">Payment</Text>
      </Box>
      <PaymentForm session={stripeSession} />
    </Elements>
  )
}

export default Payment