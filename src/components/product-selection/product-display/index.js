import React from "react"
import { Flex, Image } from "@theme-ui/components"
import Info from "./info"

const ProductDisplay = ({ region, product }) => {
  return product ? (
    <Flex>
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
