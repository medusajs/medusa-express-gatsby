import { Card, Flex, Image } from "@theme-ui/components"
import React, { useContext } from "react"
import OrderContext, { cartStates } from "../../context/order-context"
import Checkmark from "../../images/check.png"
import ShippingAndInfo from "../shipping"

const Shipping = ({ region, country, activeStep, setActiveStep }) => {
  const { status, cart } = useContext(OrderContext)

  const hasShipping = status === cartStates.HAS_SHIPPING

  let triggerStyles = {}

  if (hasShipping) {
    triggerStyles.color = "darkgrey"
  }

  // Cart not initialized yet
  if (!cart?.items?.length) {
    triggerStyles.pointerEvents = "none"
  } else {
    triggerStyles.cursor = "pointer"
  }

  return (
    <Flex variant="layout.stepContainer">
      {activeStep === "shipping" ? (
        <Card variant="container">
          <ShippingAndInfo
            country={country}
            region={region}
            nextStep={() => setActiveStep("payment")}
          />
        </Card>
      ) : (
        <Card
          variant="accordionTrigger"
          onClick={() => setActiveStep("shipping")}
          sx={triggerStyles}
        >
          Shipping and info
          {hasShipping && <Image src={Checkmark} />}
        </Card>
      )}
    </Flex>
  )
}

export default Shipping
