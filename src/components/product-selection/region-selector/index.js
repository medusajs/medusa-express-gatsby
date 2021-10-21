import { Select, Flex, Text } from "@theme-ui/components";
import React, { useContext, useEffect, useState } from "react";
import OrderContext from "../../../context/order-context";
import { client } from "../../../utils/client";

const RegionSelector = () => {
  const [regions, setRegions] = useState([]);
  const { selectRegion } = useContext(OrderContext);

  useEffect(() => {
    const fetchRegions = async () => {
      const regions = await client.regions
        .list()
        .then(({ regions }) => regions);

      selectRegion(regions[0]);
      setRegions(regions);
    };

    fetchRegions();
  }, []);

  const handleChange = (e) => {
    const region = JSON.parse(e.target.value);
    selectRegion(region);
  };

  return (
    <Flex
      sx={{
        alignItems: "center",
      }}
    >
      <Text
        sx={{
          mr: "0.5em",
        }}
      >
        Region
      </Text>
      <Select
        onChange={handleChange}
        sx={{
          minWidth: "150px",
        }}
      >
        {regions.map((r, i) => {
          return (
            <option key={i} value={JSON.stringify(r)}>
              {r.name}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};

export default RegionSelector;
