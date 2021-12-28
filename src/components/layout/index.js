import { keyframes } from "@stitches/react";
import React, { useMemo } from "react";
import OuterLayout from "./layout";

const open = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const close = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

const Layout = ({ children, regions, country, regionId }) => {
  const selectedRegion = useMemo(() => {
    return regions.find((r) => r.id === regionId);
  }, [regions, regionId]);

  return (
    <OuterLayout region={selectedRegion} regions={regions} country={country}>
      {children}
    </OuterLayout>
  );
};

export default Layout;
