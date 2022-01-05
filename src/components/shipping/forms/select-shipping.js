import { Box, Flex, Text } from "@theme-ui/components"
import React, { useContext, useEffect, useState } from "react"
import OrderContext from "../../../context/order-context"
import { formatMoney } from "../../../utils/format-money"

const ShippingOption = ({ selected, option, region, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: selected ? 600 : 350,
        width: "100%",
        height: "40px",
        border: selected ? "2px solid #111827;" : "1px solid #E5E7EB",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "4px",
        mt: "8px",
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
                bg: selected ? "black" : "white",
                border: selected ? "none" : "1px solid #D1D5DB;",
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
          <Text sx={{ color: selected ? "primary" : "#6B7280" }}>
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

  const handleClick = async id => {
    const alreadySelected = cart?.shipping_methods?.some(
      so => id === so.shipping_option_id
    )

    if (alreadySelected) {
      return
    }

    setAdded(id)
    formik.setFieldValue(`${set}.${name}`, id)
    await addShippingMethod(id)
    setAdded("")
  }

  useEffect(() => {
    if (shipping?.length) {
      handleClick(shipping[0].id)
    }
  }, [shipping])

  return (
    <Flex sx={{ flexDirection: "column" }}>
      {shipping.map(s => {
        const res = cart.shipping_methods.find(
          so => s.id === so.shipping_option_id
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
    </Flex>
  )
}

export default SelectShipping
