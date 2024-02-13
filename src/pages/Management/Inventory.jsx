import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";

function Inventory() {
  return (
    <Box m="1.5rem 2.5rem">
      <div className="flex justify-between items-center">
        <Header
          title="Manage Inventory"
          subtitle="Modify data on the database."
        />
      </div>
    </Box>
  );
}

export default Inventory;
