import React, { useContext, useState, useEffect } from "react"
import OrderContext from "../../../context/order-context"
import { Text, Box, Flex, Label, Radio, Select } from "@theme-ui/components"
import { formatMoney } from "../../../utils/format-money"

const ShippingOption = ({ selected, option, region, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: "1em",
        fontWeight: 350,
        width: "50%",
        backgroundColor: "#F7F7FA",
        border: "1px solid white",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      value={option?.id}
    >
      {option && region && (
        <>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Flex
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "12px",
                height: "12px",
                bg: "primary",
                borderRadius: "50%",
              }}
            >
              {selected && (
                <Box
                  sx={{
                    width: "6px",
                    height: "6px",
                    bg: "white",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Flex>
            <Text sx={{ mx: "1rem" }}>{option.name}</Text>
          </Flex>
          <Text>
            {formatMoney(
              {
                currency_code: region.currency_code.toUpperCase(),
                amount: option.amount,
              },
              2,
              region.tax_rate
            )}
          </Text>
        </>
      )}
    </Flex>
  )
}

const SelectShipping = ({ formik, value, name, set, placeholder, region }) => {
  const { cart, shipping, addShippingMethod } = useContext(OrderContext)
  const [added, setAdded] = useState("")

  const handleClick = async (id) => {
    setAdded(id)
    formik.setFieldValue(`${set}.${name}`, id)
    await addShippingMethod(id)
    setAdded("")
  }

  console.log(cart.shipping_methods)
  console.log(shipping)
  return (
    <Box
      sx={{
        mb: ".75em",
      }}
    >
      <Flex sx={{ flexWrap: "wrap" }}>
        {shipping.map((s) => {
          console.log(s.id)
          const res = cart.shipping_methods.find(
            (so) => s.id === so.shipping_option_id
          )
          return (
            <ShippingOption
              key={s.id}
              onClick={() => handleClick(s.id)}
              selected={res !== undefined || added === s.id}
              option={s}
              region={region}
            />
          )
        })}
        {shipping.length % 2 === 1 && (
          <ShippingOption
            key={undefined}
            onClick={() => {}}
            selected={false}
            option={undefined}
            region={undefined}
          />
        )}
      </Flex>
    </Box>
  )
}

export default SelectShipping
