import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";

function Insights() {
  return (
    <Box m="1.5rem 2.5rem">
      <div className="flex justify-between items-center">
        <Header
          title="Data Insights and Analysis"
          subtitle="Generate forecast or analytics for all data available."
        />
      </div>
    </Box>
  );
}

export default Insights;
