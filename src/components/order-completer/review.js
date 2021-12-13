import React, { useContext, useMemo } from "react"
import OrderContext from "../../context/order-context"
import { Flex, Image, Button, Text } from "@theme-ui/components"

const Review = () => {
  const { cart, destroyCart } = useContext(OrderContext)
  const item = useMemo(() => {
    return cart.items[0]
  }, [cart.items])

  return (
    <Flex
      sx={{
        alignItems: "top",
      }}
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        sx={{
          height: "90px",
          width: "auto",
          borderRadius: "4px",
        }}
      />
      <Flex
        sx={{
          flex: 1,
          flexDirection: "column",
          fontWeight: "500",
          fontSize: ".8em",
          paddingLeft: "20px",
        }}
      >
        <Text sx={{ fontWeight: 550, marginBottom: "10px" }}>{item.title}</Text>
        <Flex
          sx={{
            width: "100%",
            fontWeight: 300,
            justifyContent: "space-between",
          }}
        >
          <Text sx={{ marginBottom: "15px" }}>
            <Text sx={{ color: "#B0B0B0" }}>Size: </Text>
            {item.variant.title}
          </Text>
          <Button variant="edit" onClick={() => destroyCart()}>
            Edit
          </Button>
        </Flex>
        <Text sx={{ fontWeight: 300 }}>
          <Text sx={{ color: "#B0B0B0" }}>quantity: </Text>
          {item.quantity}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Review
