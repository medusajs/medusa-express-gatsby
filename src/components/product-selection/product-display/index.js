import React from "react"
import { Flex, Image } from "@theme-ui/components"
import Info from "./info"
import Spinner from "../../order-completer/spinner"

const ProductDisplay = ({ showSpinner, region, product }) => {
  return product ? (
    <Flex>
      {showSpinner && (
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
      <Image
        sx={{
          maxWidth: "280px",
          maxHeight: "280px",
          height: "auto",
          objectFit: "contain",
          objectPosition: "center center",
        }}
        src={product.thumbnail}
        alt={product.title}
      />
      <Info product={product} region={region} />
    </Flex>
  ) : null
}

export default ProductDisplay
