import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import SplineChart from "components/SplineChart";
function Insights() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Data Insights and Analysis"
        subtitle="Generate forecast or analytics for all data available."
      />
      <div className="w-full py-5">
        <SplineChart />
      </div>
    </Box>
  );
}

export default Insights;
