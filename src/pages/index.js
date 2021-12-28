import { navigate } from "gatsby";
import * as React from "react";
import { Card, Flex, Image, Text } from "theme-ui";
import Layout from "../components/layout/layout";
import Github from "../images/github.png";

const IndexPage = () => {
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
                display: "flex",
                pb: "16px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              Medusa{" "}
              <span style={{ fontStyle: "italic", marginLeft: "5px" }}>
                Express
              </span>
            </Text>
            <Text variant="summary" sx={{ mb: "8px", color: "#111827" }}>
              What if we could buy and sell products via a URL link that sends
              you directly to a check-out flow?
            </Text>
            <Text variant="summary" sx={{ mb: "8px" }}>
              We've been experimenting with this idea and are now ready to
              preview a beta version.
            </Text>
            <Text variant="summary" sx={{ mb: "16px" }}>
              Imagine Stripe payment links - but open-source.
            </Text>
            <Text
              variant="summary"
              sx={{
                mb: "16px",
                color: "#3B82F6",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={() => navigate("/dk/basic-shirt")}
            >
              Explore the demo
            </Text>
            <Flex
              sx={{ width: "100%", justifyContent: "center" }}
              as="a"
              href="https://github.com/medusajs/medusa-express"
              target="_blank"
            >
              <Image src={Github} sx={{ height: "25px", width: "25px" }} />
            </Flex>
          </Flex>
        </Card>
      </Layout>
    </main>
  );
};

export default IndexPage;
