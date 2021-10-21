import React from "react";
import { Flex, Text } from "@theme-ui/components";

const ErrorMessage = ({ error }) => {
  return (
    <Flex
      sx={{
        mt: ".5em",
        alignItems: "center",
      }}
    >
      <Flex
        sx={{
          color: "white",
          background: "red",
          justifyContent: "center",
          borderRadius: "50%",
          fontSize: "6px",
          height: "12px",
          width: "12px",
          mr: ".5em",
        }}
      >
        <Text>!</Text>
      </Flex>
      <Text
        sx={{
          color: "red",
          fontSize: "12px",
        }}
      >
        {error}
      </Text>
    </Flex>
  );
};

export default ErrorMessage;
