import { Box, Divider, Flex, Text } from "@theme-ui/components"
import React, { useContext } from "react"
import { Button } from "theme-ui"
import OrderContext from "../../context/order-context"
import ProductDisplay from "./product-display"

const ProductSelection = ({ product, region, country, nextStep }) => {
  const { createCart } = useContext(OrderContext)

  const handleSubmit = () => {
    createCart(region.id, country).finally(() => nextStep())
  }

  return (
    <Box>
      <Text variant="header3">Product</Text>
      <Flex sx={{ mt: "16px", justifyContent: "center" }}>
        <ProductDisplay region={region} product={product} />
      </Flex>
      <Divider sx={{ color: "#E5E7EB", my: "16px" }} />
      <Button sx={{}} onClick={() => handleSubmit()} variant="cta">
        Continue
      </Button>
    </Box>
  )
}

export default ProductSelection
