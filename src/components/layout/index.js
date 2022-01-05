import React, { useMemo } from "react"
import OuterLayout from "./layout"

const Layout = ({ children, regions, country, regionId }) => {
  const selectedRegion = useMemo(() => {
    return regions.find(r => r.id === regionId)
  }, [regions, regionId])

  return (
    <OuterLayout region={selectedRegion} regions={regions} country={country}>
      {children}
    </OuterLayout>
  )
}

export default Layout
