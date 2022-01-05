import { graphql, navigate } from "gatsby"
import * as React from "react"
import { Card, Flex, Image, Text } from "theme-ui"
import Layout from "../components/layout/layout"
import Discord from "../images/discord.png"
import Github from "../images/github.png"
import MedusaMark from "../images/mark.png"
import MedusaLogo from "../images/medusa-logo.png"

const IndexPage = ({ data }) => {
  return (
    <main>
      <Layout>
        <Card variant="container">
          <Flex sx={{ flexDirection: "column" }}>
            <Text
              sx={{
                mb: "16px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                pb: "16px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <Image src={MedusaLogo} sx={{ width: "110px" }} />
              <span style={{ fontStyle: "italic", marginLeft: "5px" }}>
                Express
              </span>
            </Text>
            <Text variant="landingpageText" sx={{ color: "#111827" }}>
              What if we could buy and sell products via a link that sends you
              directly to a check-out flow?
            </Text>
            <Text variant="landingpageText">
              We've been experimenting with this idea and are now ready to
              preview a beta version.
            </Text>
            <Text variant="landingpageText" sx={{ mb: "16px" }}>
              An open-source alternative to Stripe payment links.
            </Text>
            <Text
              variant="landingpageText"
              sx={{
                mb: "16px",
                color: "#3B82F6",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/${data.product.edges[0].node.handle}`)}
            >
              Explore the demo
            </Text>
            <Flex
              sx={{
                borderTop: "1px solid #E5E7EB",
                paddingTop: "8px",
                flexDirection: "column",
              }}
            >
              <Text
                variant="landingpageText"
                sx={{ my: "16px", color: "#111827", fontWeight: "600" }}
              >
                Get your own in only a couple of minutes
              </Text>
              <Text
                variant="landingpageText"
                sx={{ mb: "16px", "& a": { color: "#111827" } }}
              >
                <a
                  href="https://github.com/medusajs/medusa#-quickstart"
                  target="_blank"
                >
                  1. Create a Medusa server
                </a>
              </Text>
              <Text
                variant="landingpageText"
                sx={{ mb: "16px", "& a": { color: "#111827" } }}
              >
                <a
                  href="https://github.com/medusajs/medusa-express#-quick-start"
                  target="_blank"
                >
                  2. Setup Medusa Express
                </a>
              </Text>
              <Text
                variant="landingpageText"
                sx={{ mb: "16px", "& a": { color: "#111827" } }}
              >
                <a
                  href="https://github.com/medusajs/admin#-quickstart"
                  target="_blank"
                >
                  3. Add your own products with Medusa Admin
                </a>
              </Text>
            </Flex>
            <Flex sx={{ width: "100%", justifyContent: "center", mt: [3] }}>
              <Flex
                as="a"
                href="https://github.com/medusajs/medusa-express"
                target="_blank"
              >
                <Image
                  src={Github}
                  sx={{ height: "25px", width: "25px", mx: [2] }}
                />
              </Flex>
              <Flex as="a" href="https://discord.gg/medusajs" target="_blank">
                <Image src={Discord} sx={{ width: "25px", mx: [2] }} />
              </Flex>
              <Flex as="a" href="https://medusajs.com" target="_blank">
                <Image src={MedusaMark} sx={{ width: "25px", mx: [2] }} />
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Layout>
    </main>
  )
}

export const query = graphql`
  query {
    product: allMedusaProduct(limit: 1) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
`

export default IndexPage
