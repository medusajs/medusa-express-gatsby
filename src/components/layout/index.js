import React, { useContext, useMemo } from "react"
import { Card, Flex, Box, Spinner, Text, Link } from "@theme-ui/components"
import OrderContext from "../../context/order-context"
import ProductSelection from "../product-selection"
import OrderCompleter from "../order-completer"
import Logo, { MedusaLogo, LogoText } from "./logo"
import LayoutTest from "./layout"

const Layout = ({ product, regions, country, regionId }) => {
  const { cart } = useContext(OrderContext)

  const selectedRegion = useMemo(() => {
    return regions.find((r) => r.id === regionId)
  }, [regions, regionId])

  return (
    <LayoutTest>
      {product ? (
        <>
          {cart.items < 1 ? (
            <ProductSelection
              product={product}
              regions={regions}
              region={selectedRegion}
              country={country}
            />
          ) : (
            <OrderCompleter country={country} region={selectedRegion} />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </LayoutTest>
  )
}

export default Layout
