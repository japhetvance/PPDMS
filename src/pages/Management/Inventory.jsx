import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import ManageInverntoryTable from "components/Tables/ManageInventoryTable";
import StatBox from "components/StatBox";
import EggIcon from "@mui/icons-material/Egg";

function Inventory() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Manage Inventory"
        subtitle="Modify data on the database."
      />
      <div className="w-full py-5 flex flex-col gap-2 ">
        <div className="w-full flex gap-2 justify-between items-center">
          <StatBox
            title="Remaining Small Eggs"
            value="1"
            // increase="1%"
            description="Since last week"
            icon={<EggIcon sx={{ color: "white", fontSize: "16px" }} />}
          />
          <StatBox
            title="Remaining Medium Eggs"
            value="1"
            // increase="1%"
            description="Since last week"
            icon={<EggIcon sx={{ color: "white", fontSize: "24px" }} />}
          />
          <StatBox
            title="Remaining Large Eggs"
            value="1"
            // increase="1%"
            description="Since last week"
            icon={<EggIcon sx={{ color: "white", fontSize: "32px" }} />}
          />
        </div>
        <ManageInverntoryTable />
      </div>
    </Box>
  );
}

export default Inventory;
