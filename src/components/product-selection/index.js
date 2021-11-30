import React, { useState, useContext, useEffect } from "react"
import { Box, Flex, Text } from "@theme-ui/components"
import OrderContext from "../../context/order-context"
import RegionSelector from "./region-selector"
import ProductDisplay from "./product-display"
import { client } from "../../utils/client"
import BreadCrumbs from "../breadcrumbs"
import { Button } from "theme-ui"
import { formatVariantPrice } from "../../utils/variant-price"

const ProductSelection = ({ product, region, regions, country }) => {
  const { createCart, status, variant, variantId } = useContext(OrderContext)
  const [inventory, setInventory] = useState({})

  useEffect(() => {
    client.products.retrieve(product.id).then(({ product: details }) => {
      const inventoryObj = details.variants.reduce((acc, next) => {
        acc[next.id] = next.inventory_quantity
        return acc
      }, {})

      setInventory(inventoryObj)
    })
  }, [product])

  return (
    <Box>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: "1em",
        }}
      >
        <BreadCrumbs
          sx={{
            alignItems: "center",
          }}
          step={0}
        />
        <RegionSelector selected={country} regions={regions} />
      </Flex>
      <Text variant="header3">{product.title}</Text>
      <Flex mt={4}>
        <ProductDisplay product={product} />
      </Flex>
      <Flex
        my={3}
        sx={{
          py: "16px",
          width: "100%",
          justifyContent: "space-between",
          borderBottom: "1px solid #F0F0F0",
        }}
      >
        <Text>Total</Text>
        <Text>{formatVariantPrice(variant, region)}</Text>
      </Flex>
      <Button
        sx={{ width: "100%", padding: "25px", cursor: "pointer" }}
        onClick={() => {
          createCart(region.id, country)
        }}
        variant="cta"
      >
        Buy now
      </Button>
    </Box>
  )
}

export default ProductSelection
