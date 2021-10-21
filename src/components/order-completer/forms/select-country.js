import React, { useContext, useState, useEffect } from "react";
import OrderContext from "../../../context/order-context";
import { Box, Select } from "@theme-ui/components";

const SelectCountry = ({ formik, value, name, set, placeholder }) => {
  const { selectedRegion } = useContext(OrderContext);
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
        {selectedRegion.countries.map((c, i) => {
          return (
            <option key={i} value={c.iso_2}>
              {c.display_name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectCountry;
