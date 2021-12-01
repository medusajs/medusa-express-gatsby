import React from "react"
import { Card, Flex, Text, Link } from "@theme-ui/components"
import Logo, { MedusaLogo, LogoText } from "./logo"

const Layout = ({ children }) => {
  return (
    <Flex sx={{ width: "100%", flexDirection: "column" }}>
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
            width: "700px",
            height: "auto",
            p: "1.5em",
            borderRadius: "8px",
            justifyContent: "center",
            transition: "all .2s linear",
          }}
        >
          <LogoText />
          {children}
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
            <Link
              sx={{
                textDecoration: "none",
                color: "medusa100",
              }}
              href="https://www.medusa-commerce.com/"
            >
              <Flex sx={{ paddingTop: "10px", alignItems: "center" }}>
                <MedusaLogo />
                <Text
                  sx={{
                    color: "#A3A3A3",
                    fontWeight: 500,
                    fontSize: "1.2em",
                  }}
                >
                  Medusa
                </Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
