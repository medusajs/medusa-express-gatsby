import { Card, Flex, Image } from "@theme-ui/components"
import React, { useContext } from "react"
import OrderContext from "../../context/order-context"
import Checkmark from "../../images/check.png"
import ProductSelection from "../product-selection"

const Steps = ({
  product,
  regions,
  country,
  region,
  activeStep,
  setActiveStep,
}) => {
  const { cart } = useContext(OrderContext)
  const cartCreated = cart?.id

  let triggerStyles = {}

  if (cartCreated) {
    triggerStyles.color = "darkgrey"
    triggerStyles.cursor = "pointer"
  }

  return (
    <Flex variant="layout.stepContainer">
      {activeStep === "product" ? (
        <Card variant="container">
          <ProductSelection
            region={region}
            regions={regions}
            country={country}
            product={product}
            nextStep={() => setActiveStep("shipping")}
          />
        </Card>
      ) : (
        <Card
          variant="accordionTrigger"
          onClick={() => setActiveStep("product")}
          sx={triggerStyles}
        >
          Product
          {cartCreated && <Image src={Checkmark} />}
        </Card>
      )}
    </Flex>
  )
}

export default Steps
