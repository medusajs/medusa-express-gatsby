import React, { useContext, useEffect, useState } from "react"
import { Image, Flex, Text } from "@theme-ui/components"
import { formatMoney } from "../../utils/format-money"
import OrderContext from "../../context/order-context"
import { client } from "../../utils/client"

const OrderConfirmation = ({ order }) => {
  const [country, setCountry] = useState(undefined)

  client.regions.retrieve(order.region_id).then(({ region }) => {
    console.log(region)
    const res = region.countries.find(
      (c) => c.iso_2 === order.shipping_address.country_code
    ).name
    setCountry(res)
  })

  const customerName =
    !order.customer.first_name || !order.customer.last_name
      ? `${order.shipping_address.first_name} ${order.shipping_address.last_name}`
      : `${order.customer.first_name} ${order.customer.last_name}`

  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      <Flex
        mt={3}
        pb={3}
        sx={{
          alignItems: "center",
          fontSize: "1.2em",
          borderBottom: "1px solid #B0B0B0",
        }}
      >
        <Flex sx={{ marginRight: "10px" }} variant="text.subheading">
          Order number:{" "}
        </Flex>{" "}
        <Text>#{order.display_id}</Text>
      </Flex>
      <Flex my={3} pb={3} sx={{ flex: 1, borderBottom: "1px solid #B0B0B0" }}>
        <Flex
          sx={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text variant="confirmationHeading">Shipping address</Text>
          <Text variant="confirmationText">
            Name:{" "}
            {`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}
          </Text>
          <Text variant="confirmationText">
            Address: {order.shipping_address.address_1}
          </Text>
          <Text variant="confirmationText">
            City: {order.shipping_address.city}
          </Text>
          <Text variant="confirmationText">
            Country:{" "}
            {country || order.shipping_address.country_code.toUpperCase()}
          </Text>
        </Flex>
        <Flex sx={{ flex: 1, flexDirection: "column" }}>
          <Text variant="confirmationHeading">Customer</Text>
          <Text variant="confirmationText">Name: {customerName} </Text>
          <Text variant="confirmationText">Email: {order.customer.email} </Text>
          <Text variant="confirmationText">
            Phone: {order.shipping_address.phone}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        {order.items.map((item) => {
          return (
            <Flex
              sx={{
                alignItems: "top",
                flex: 1,
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
                <Flex
                  sx={{
                    width: "100%",
                    marginBottom: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item.title}</Text>
                  <Text>
                    {formatMoney({
                      amount: item.unit_price,
                      currency_code: order.region.currency_code,
                    })}
                  </Text>
                </Flex>
                <Flex
                  sx={{
                    width: "100%",
                    fontWeight: 300,
                    justifyContent: "space-between",
                  }}
                >
                  <Text sx={{ marginBottom: "10px" }}>
                    <Text sx={{ color: "#B0B0B0" }}>Size: </Text>
                    {item.variant.title}
                  </Text>
                </Flex>
                <Text sx={{ fontWeight: 300 }}>
                  <Text sx={{ color: "#B0B0B0" }}>quantity: </Text>
                  {item.quantity}
                </Text>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
      <Flex>
        {order.shipping_methods.map((item) => {
          return (
            <Flex
              mt={4}
              mb={3}
              sx={{
                alignItems: "top",
                flex: 1,
              }}
            >
              <Flex
                sx={{
                  flex: 1,
                  flexDirection: "column",
                  fontWeight: "500",
                  fontSize: ".8em",
                }}
              >
                <Flex sx={{ flex: 1, justifyContent: "space-between" }}>
                  <Text sx={{ fontWeight: 550 }}>
                    {item.shipping_option.name}
                  </Text>
                  <Text>
                    {formatMoney({
                      amount: item.price,
                      currency_code: order.region.currency_code,
                    })}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
      <Flex
        my={1}
        pt={3}
        sx={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #D0D0D0",
        }}
      >
        <Flex
          sx={{ marginRight: "10px", fontSize: "1em" }}
          variant="text.subheading"
        >
          Total:{" "}
        </Flex>{" "}
        <Text>
          {formatMoney({
            amount: order.total,
            currency_code: order.region.currency_code,
          })}
        </Text>
      </Flex>
    </Flex>
  )
}

export default OrderConfirmation
