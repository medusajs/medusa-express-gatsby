import { Card, Flex, Image } from "@theme-ui/components";
import React, { useContext } from "react";
import OrderContext from "../../context/order-context";
import Checkmark from "../../images/check.png";
import ShippingAndInfo from "../shipping";

const Shipping = ({ region, country, activeStep, setActiveStep }) => {
  const { status } = useContext(OrderContext);

  const hasShipping = status === "cart_updated";

  return (
    <Flex sx={{ width: "100%", height: "100%", mb: "8px" }}>
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
          sx={hasShipping && { color: "darkgrey" }}
        >
          Shipping and info
          {hasShipping && <Image src={Checkmark} />}
        </Card>
      )}
    </Flex>
  );
};

export default Shipping;
