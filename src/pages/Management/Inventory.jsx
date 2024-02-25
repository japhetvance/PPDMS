import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import ManageInverntoryTable from "components/Tables/ManageInventoryTable";

function Inventory() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Manage Inventory"
        subtitle="Modify data on the database."
      />
      <div className="w-full py-5">
        <ManageInverntoryTable />
      </div>
    </Box>
  );
}

export default Inventory;
