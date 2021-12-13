import { Select, Flex, Text } from "@theme-ui/components"
import { navigate } from "gatsby"
import React from "react"

const RegionSelector = ({ selected, regions }) => {
  const handleChange = (e) => {
    const [_, countryOrHandle, handle] = window.location.pathname.split("/")

    if (!handle) {
      navigate(`/${e.target.value}/${countryOrHandle}`)
    } else {
      navigate(`/${e.target.value}/${handle}`)
    }
  }

  return (
    <Flex
      sx={{
        alignItems: "center",
      }}
    >
      <Text
        sx={{
          mr: "0.5em",
          color: "#B0B0B0",
        }}
      >
        Region
      </Text>
      <Select
        value={selected}
        onChange={handleChange}
        sx={{
          minWidth: "150px",
          backgroundColor: "white",
          border: "1px solid #0A3149",
          color: "#0A3149",
        }}
      >
        {regions.map((r, i) => {
          return r.countries.map((country) => {
            return (
              <option key={country.iso_2} value={country.iso_2}>
                {country.display_name}
              </option>
            )
          })
        })}
      </Select>
    </Flex>
  )
}

export default RegionSelector
