import { Box, Image } from "@theme-ui/components";
import React from "react";
import logo from "../../icons/logo.svg";

const Logo = () => {
  return (
    <Box>
      <Image
        src={logo}
        sx={{
          height: "42px",
          width: "auto",
        }}
      />
    </Box>
  );
};

export default Logo;
