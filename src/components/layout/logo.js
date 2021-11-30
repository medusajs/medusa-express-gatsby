import { Box, Image } from "@theme-ui/components";
import React from "react";
import logo from "../../icons/logo.svg"; //"../../icons/logo.svg";
import smallLogo from "../../icons/medusa-small.svg";

const Logo = () => {
  return (
    <Box>
      <Image
        src={logo}
        sx={{
          height: "75px",
          width: "auto",
        }}
      />
    </Box>
  );
};

export const SmallLogo = () => {
  return (
    <Box sx={{marginRight: '10px', height: '28px', alignItems: 'center'}}>
      <Image
        src={smallLogo}
        sx={{
          height: "100%",
          width: "auto",
        }}
      />
    </Box>
  );
};

export default Logo;
