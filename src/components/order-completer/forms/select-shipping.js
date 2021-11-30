import React, { useContext, useState, useEffect } from "react"
import OrderContext from "../../../context/order-context"
import { Text, Box, Flex, Label, Radio, Select } from "@theme-ui/components"
import { formatMoney } from "../../../utils/format-money";

const ShippingOption = ({ selected, option, region, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: "1em",
        fontWeight: 350,
        width: '50%',
        backgroundColor: "#F7F7FA",
        border: '1px solid white',
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      value={option?.id}
    >
    {option && region && (
      <>
      <Flex sx={{ alignItems: "center", justifyContent: 'space-between' }}>
          <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "12px",
            height: "12px",
            bg: "#454B54",
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
  );
};


const SelectShipping = ({ formik, value, name, set, placeholder, region }) => {
  const { shipping } = useContext(OrderContext)
  const [error, setError] = useState(false)
  const test = ["test1", "test2", "test3", "test4"]

  const shippingCell = (shippingOption) => {
    return (
      <Flex bg="blue" sx={{ width: "50%", border: "1px solid white" }}>
        {shippingOption}
      </Flex>
    )
  }

  const handleClick = (id) => {
    formik.setFieldValue(`${set}.${name}`, id);
  };

  useEffect(() => {
    if (formik.errors[set]?.[name] && formik.touched[set]?.[name]) {
      setError(true)
    } else {
      setError(false)
    }
  }, [formik.errors])
  return (
    <Box
      sx={{
        mb: ".75em",
      }}
    >
      <Flex sx={{ flexWrap: "wrap" }}>
        {shipping.map((s) => {
          return (
            <ShippingOption 
              key={s.id}
              onClick={() => handleClick(s.id)}
              selected={value === s.id}
              option={s}
              region={region}
            />)

            // <Flex
            //   sx={{
            //     width: "50%",
            //     backgroundColor: "#F7F7FA",
            //     border: "1px solid white",
            //     alignItems: "center",
            //     padding: "10px",
            //     // justifyContent: "space-between",
            //   }}
            // >
              {/* <Flex sx={{ width: '100%', alignItems: "inherit" ,
          }}> */}
            
                {/* <Radio
                  sx={{ backgroundColor: "white" }}
                  name={s}
                  selected={value === s.id}
                  // value="false"
                /><Text sx={{fontWeight: 300 }}>
                {s}
                  </Text>
              </Flex>
                <Text sx={{fontWeight: 300 }}>{`${
                  10 / 100
                } ${region.currency_code.toUpperCase()}`}</Text> */}
            {/* </Flex> */}
      {/* </Flex> */}
            })}
        {shipping.length % 2 === 1 && (
           <ShippingOption 
           key={undefined}
           onClick={() => {}}
           selected={false}
           option={undefined}
           region={undefined}
         />)
        }
      </Flex>

      {/* <Select
        name={`${set}.${name}`}
        value={value}
        onChange={formik.handleChange}
        sx={{
          border: "1px solid",
          borderColor: error ? "salmon" : "cool",
          transition: "all .2s linear",
        }}
      >
        <option value={null}>{placeholder}</option>
        {shipping.map((s) => {
          return (
            <option key={s.id} value={s.id}>{`${s.name} – ${
              s.amount / 100
            } ${selectedRegion.currency_code.toUpperCase()}`}</option>
          );
        })}
        </Select> */}
    </Box>
  )
}

export default SelectShipping
