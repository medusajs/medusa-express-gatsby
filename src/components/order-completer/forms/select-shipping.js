import React, { useContext, useState, useEffect } from "react";
import OrderContext from "../../../context/order-context";
import { Box, Select } from "@theme-ui/components";

const SelectShipping = ({ formik, value, name, set, placeholder }) => {
  const { shipping, selectedRegion } = useContext(OrderContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (formik.errors[set]?.[name] && formik.touched[set]?.[name]) {
      setError(true);
    } else {
      setError(false);
    }
  }, [formik.errors]);
  return (
    <Box
      sx={{
        mb: ".75em",
      }}
    >
      <Select
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
      </Select>
    </Box>
  );
};

export default SelectShipping;
