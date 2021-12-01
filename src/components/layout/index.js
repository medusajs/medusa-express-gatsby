import React, { useContext, useMemo } from "react"
import { Card, Flex, Box, Spinner, Text, Link } from "@theme-ui/components"
import OrderContext from "../../context/order-context"
import ProductSelection from "../product-selection"
import OrderCompleter from "../order-completer"
import Logo, { MedusaLogo, LogoText } from "./logo"

const Layout = ({ product, regions, country, regionId }) => {
  const { cart } = useContext(OrderContext)

  console.log(country)

  const selectedRegion = useMemo(() => {
    return regions.find((r) => r.id === regionId)
  }, [regions, regionId])

  return (
    <Flex sx={{ widht: "100%", flexDirection: "column" }}>
      <Flex
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          paddingTop: "2em",
        }}
      >
        <Logo />
        <Card
          variant="container"
          sx={{
            bg: "white",
            my: "2em",
            width: "700px", //cart.items < 1 ? "800px" : "500px",
            height: "auto", //cart.items < 1 ? "400px" :
            p: "1.5em",
            borderRadius: "8px",
            justifyContent: "center",
            transition: "all .2s linear",
          }}
        >
          <LogoText />
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
        </Card>
        <Flex
          sx={{
            justifyContent: "center",
            paddingTop: "10px",
            width: "100%",
            height: "100px",
            backgroundColor: "#F3F3F6",
          }}
        >
          <Flex
            sx={{
              paddingTop: "10px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              sx={{
                fontWeight: "500",
                fontSize: "0.7em",
                color: "#A3A3A3",
                letterSpacing: "4px",
              }}
            >
              POWERED BY
            </Text>
            <Flex sx={{ paddingTop: "10px", alignItems: "center" }}>
              <MedusaLogo />
              <Link
                sx={{
                  textDecoration: "none",
                  color: "medusa100",
                }}
                href="https://www.medusa-commerce.com/"
              >
                <Text
                  sx={{ color: "#A3A3A3", fontWeight: 500, fontSize: "1.2em" }}
                >
                  Medusa
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
