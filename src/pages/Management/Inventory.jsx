import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import ManageInverntoryTable from "components/Tables/ManageInventoryTable";
import SalesInventoryTable from "components/Tables/SalesInventoryTable";
import FlockInventoryTable from "components/Tables/FlockInventoryTable";
import StatBox from "components/StatBox";
import EggIcon from "@mui/icons-material/Egg";
import { Tabs, Tab } from "@mui/material";
import axios from "axios";

function Inventory() {
  const [eggCounts, setEggCounts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    axios
      .get("https://13.211.142.147/api/current/eggcount")
      .then((response) => {
        setEggCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching egg counts:", error);
      });
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Manage Inventory"
        subtitle="Sales overview and egg inventory."
      />
      <div className="w-full py-5 flex flex-col gap-2 ">
        <div className="w-[99%] flex gap-2 justify-between items-center">
          {eggCounts.map((egg) => (
            <StatBox
              key={egg.egg_type}
              title={`Remaining ${
                egg.egg_type === "egg_sm"
                  ? "Small Eggs"
                  : egg.egg_type === "egg_md"
                  ? "Medium Eggs"
                  : "Large Eggs"
              }`}
              value={egg.egg_quantity}
              description={`${egg.egg_cost} php per piece.`}
              icon={
                <EggIcon
                  sx={{
                    color: "white",
                    fontSize:
                      egg.egg_type === "egg_sm"
                        ? "16px"
                        : egg.egg_type === "egg_md"
                        ? "24px"
                        : "32px",
                  }}
                />
              }
            />
          ))}
        </div>
        <div className="w-[99%] relative">
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Egg Inventory" />
            <Tab label="Sales Inventory" />
            <Tab label="Flocks Inventory" />
          </Tabs>
          {tabIndex === 0 && <ManageInverntoryTable />}
          {tabIndex === 1 && <SalesInventoryTable />}
          {tabIndex === 2 && <FlockInventoryTable />}
        </div>
      </div>
    </Box>
  );
}

export default Inventory;
