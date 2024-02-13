import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";

function DataAudit() {
  return (
    <Box m="1.5rem 2.5rem">
      <div className="flex justify-between items-center">
        <Header
          title="Data Trail Overview"
          subtitle="Data trail of user of the system."
        />
      </div>
    </Box>
  );
}

export default DataAudit;
