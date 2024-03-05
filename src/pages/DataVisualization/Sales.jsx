import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabs from "components/Tabs/DateTabs";
import SelectFilter from "components/SelectFilter";
import { Button } from "@mui/material";

//export
import { CSVLink, CSVDownload } from "react-csv";

const Sales = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [category, setCategory] = React.useState("Sales");
  const selectOptions = ["Sales", "Profit"];

  const dummyFormData = () => {
    const Sales = {
      id: "Sales",
      color: theme.palette.secondary.main,
      data: [
        { x: "Jan", y: 2100 },
        { x: "Feb", y: 2070 },
        { x: "Mar", y: 2040 },
        { x: "Apr", y: 2080 },
        { x: "May", y: 2020 },
        { x: "Jun", y: 2040 },
        { x: "Jul", y: 2020 },
        { x: "Aug", y: 2090 },
        { x: "Sep", y: 2040 },
        { x: "Oct", y: 2020 },
        { x: "Nov", y: 2010 },
        { x: "Dec", y: 2070 },
      ],
    };
    const Profit = {
      id: "Profit",
      color: theme.palette.secondary[600],
      data: [
        { x: "Jan", y: 21000 },
        { x: "Feb", y: 20000 },
        { x: "Mar", y: 20000 },
        { x: "Apr", y: 28000 },
        { x: "May", y: 20000 },
        { x: "Jun", y: 24000 },
        { x: "Jul", y: 22000 },
        { x: "Aug", y: 29000 },
        { x: "Sep", y: 24000 },
        { x: "Oct", y: 22000 },
        { x: "Nov", y: 21000 },
        { x: "Dec", y: 27000 },
      ],
    };
    // Use category state to select the appropriate data
    const selectedData = category === "Sales" ? Sales : Profit;

    const formattedData = [selectedData];
    return formattedData;
  };

  return (
    <Box m="1.5rem 2.5rem">
      <div className=" flex justify-between items-center">
        <Header
          title="SALES REPORT"
          subtitle="Record of sales and profits for eggs."
        />
        <div className="flex justify-center gap-2">
          {/* <Button variant="contained">
            <CSVLink
              data={
                value === 0 ? dailyEgg : value === 1 ? weeklyEgg : monthlyEgg
              }
              filename={`egg_export_${
                value === 0 ? "daily" : value === 1 ? "weekly" : "monthly"
              }.csv`}
            >
              Export Data
            </CSVLink>
          </Button> */}
          <SelectFilter
            category={category}
            setCategory={setCategory}
            selectOptions={selectOptions}
          />
        </div>
      </div>
      <Box height="75vh">
        <Box>
          <DateTabs
            daily={dummyFormData()}
            weekly={dummyFormData()}
            monthly={dummyFormData()}
            value={value}
            setValue={setValue}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sales;
