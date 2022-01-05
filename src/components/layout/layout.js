import { Flex, Link, Text } from "@theme-ui/components"
import React from "react"
import RegionSelector from "../product-selection/region-selector"
import { MedusaLogo } from "./logo"

const Layout = ({ children, country, regions }) => {
  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#F3F4F6",
      }}
    >
      <Flex
        sx={{
          justifyContent: ["center", "space-between"],
          alignItems: "center",
          flexDirection: ["column", "row"],
          minHeight: "100vh",
          py: "2em",
        }}
      >
        <Flex
          sx={{
            justifyContent: ["center", "flex-end"],
            alignItems: "center",
            width: ["100%", "50%"],
          }}
        >
          {children}
        </Flex>
        <Flex
          sx={{
            justifyContent: ["center", "flex-start"],
            paddingTop: "10px",
            paddingLeft: [0, "100px"],
            width: "50%",
            height: "100px",
            backgroundColor: "#F3F3F6",
          }}
        >
          <Flex
            sx={{
              paddingTop: "10px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              sx={{
                fontWeight: "500",
                fontSize: "10px",
                color: "#A3A3A3",
                letterSpacing: "4px",
              }}
            >
              Powered by
            </Text>
            <Link
              sx={{
                textDecoration: "none",
                color: "medusa100",
              }}
              href="https://www.medusajs.com/"
            >
              <Flex sx={{ paddingTop: "10px", alignItems: "center" }}>
                <MedusaLogo />
                <Text
                  sx={{
                    color: "#A3A3A3",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                >
                  medusa{" "}
                </Text>
              </Flex>
            </Link>
            {regions?.length && (
              <RegionSelector selected={country} regions={regions} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
