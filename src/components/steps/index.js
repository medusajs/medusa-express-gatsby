import { Flex } from "@theme-ui/components"
import React, { useContext, useMemo, useState } from "react"
import OrderContext, { cartStates } from "../../context/order-context"
import Spinner from "../spinner/spinner"
import Payment from "./payment"
import Product from "./product"
import Shipping from "./shipping"

const Steps = ({ product, regions, country, regionId }) => {
  const [activeStep, setActiveStep] = useState("product")
  const { status, orderStatus } = useContext(OrderContext)

  const selectedRegion = useMemo(() => {
    return regions.find(r => r.id === regionId)
  }, [regions, regionId])

  const loadingStates = [
    cartStates.CREATING_CART,
    cartStates.COMPLETING,
    cartStates.ADDING_INFO,
    cartStates.ADDING_SHIPPING,
  ]

  return (
    <Flex sx={{ flexDirection: "column" }}>
      {(loadingStates.includes(status) ||
        loadingStates.includes(orderStatus)) && (
        <Flex
          sx={{
            position: "absolute",
            bg: "#ffffffaa",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </Flex>
      )}
      <Product
        region={selectedRegion}
        regions={regions}
        product={product}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
      <Shipping
        setActiveStep={setActiveStep}
        country={country}
        activeStep={activeStep}
        region={selectedRegion}
      />
      <Payment
        region={selectedRegion}
        country={country}
        activeStep={activeStep}
      />
    </Flex>
  )
}

export default Steps
