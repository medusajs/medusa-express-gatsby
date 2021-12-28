import React, { useEffect, useState } from "react";
import { Input, Flex } from "@theme-ui/components";

const Field = ({ formik, value, name, set, placeholder, disabled }) => {
  const [error, setError] = useState(false);

  const placeholderColor = "#BBBBBB";

  useEffect(() => {
    if (formik.errors[set]?.[name] && formik.touched[set]?.[name]) {
      setError(true);
    } else {
      setError(false);
    }
  }, [formik.errors]);
  return (
    <Flex
      sx={{
        flexDirection: "column",
        mb: ".75em",
        width: "100%",
      }}
    >
      <Input
        defaultValue={value}
        disabled={disabled}
        name={`${set}.${name}`}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={placeholder}
        sx={{
          borderColor: error ? "salmon" : "#E5E7EB;",
          fontSize: "14px",
          fontWeight: 300,
          fontFamily: "Inter",
        }}
        variant="field"
      />
    </Flex>
  );
};

export default Field;
