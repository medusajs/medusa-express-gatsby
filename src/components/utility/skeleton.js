import React from "react";
import { Box } from "@theme-ui/components";

const Skeleton = ({ width, height }) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Skeleton;
