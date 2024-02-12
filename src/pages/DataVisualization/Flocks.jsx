import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabs from "components/Tabs/DateTabs";
import SelectFilter from "components/SelectFilter";

const Flocks = () => {
  const theme = useTheme();
  const [category, setCategory] = React.useState("Active");

  const selectOptions = ["Active", "Deceased", "Sick", "Cal"];

  const dummyFormData = () => {
    let selectedData;

    switch (category) {
      case "Active":
        selectedData = {
          id: "Active",
          color: theme.palette.secondary.main,
          data: [
            { x: "Jan", y: 210 },
            { x: "Feb", y: 200 },
            { x: "Mar", y: 220 },
            { x: "Apr", y: 260 },
            { x: "May", y: 210 },
            { x: "Jun", y: 220 },
            { x: "Jul", y: 220 },
            { x: "Aug", y: 290 },
            { x: "Sep", y: 240 },
            { x: "Oct", y: 220 },
            { x: "Nov", y: 210 },
            { x: "Dec", y: 270 },
          ],
        };
        break;
      case "Deceased":
        selectedData = {
          id: "Deceased",
          color: theme.palette.secondary.main,
          data: [
            { x: "Jan", y: 31 },
            { x: "Feb", y: 36 },
            { x: "Mar", y: 33 },
            { x: "Apr", y: 38 },
            { x: "May", y: 30 },
            { x: "Jun", y: 33 },
            { x: "Jul", y: 32 },
            { x: "Aug", y: 37 },
            { x: "Sep", y: 34 },
            { x: "Oct", y: 32 },
            { x: "Nov", y: 31 },
            { x: "Dec", y: 34 },
          ],
        };
        break;
      case "Sick":
        selectedData = {
          id: "Sick",
          color: theme.palette.secondary.main,
          data: [
            { x: "Jan", y: 1 },
            { x: "Feb", y: 4 },
            { x: "Mar", y: 6 },
            { x: "Apr", y: 8 },
            { x: "May", y: 9 },
            { x: "Jun", y: 4 },
            { x: "Jul", y: 2 },
            { x: "Aug", y: 9 },
            { x: "Sep", y: 4 },
            { x: "Oct", y: 2 },
            { x: "Nov", y: 9 },
            { x: "Dec", y: 7 },
          ],
        };
        break;
      case "Cal":
        selectedData = {
          id: "Cal",
          color: theme.palette.secondary.main,
          data: [
            { x: "Jan", y: 11 },
            { x: "Feb", y: 10 },
            { x: "Mar", y: 10 },
            { x: "Apr", y: 18 },
            { x: "May", y: 10 },
            { x: "Jun", y: 14 },
            { x: "Jul", y: 12 },
            { x: "Aug", y: 19 },
            { x: "Sep", y: 14 },
            { x: "Oct", y: 12 },
            { x: "Nov", y: 11 },
            { x: "Dec", y: 17 },
          ],
        };
        break;
      default:
        selectedData = null;
    }

    const formattedData = selectedData ? [selectedData] : [];
    return formattedData;
  };

  return (
    <Box m="1.5rem 2.5rem">
      <div className=" flex justify-between items-center">
        <Header
          title="FLOCKS REPORT"
          subtitle="Record of flocks according to their status."
        />
        <SelectFilter
          category={category}
          setCategory={setCategory}
          selectOptions={selectOptions}
        />
      </div>
      <Box height="75vh">
        <Box>
          <DateTabs data={dummyFormData()} />
        </Box>
      </Box>
    </Box>
  );
};

export default Flocks;
