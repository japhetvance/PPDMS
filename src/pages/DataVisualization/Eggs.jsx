import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabs from "components/Tabs/DateTabs";
import SelectFilter from "components/SelectFilter";

import visualizeService from "services/visualize.service";

const Eggs = () => {
  const theme = useTheme();

  useEffect(() => {
    // const fetchEggVisualization = async () => {
    //   const result = await visualizeService.eggVisualize();
    //   console.log(result);
    // };
    // fetchEggVisualization();

    const fetchEggDaily = async () => {
      const result = await visualizeService.dailyEggVisualize();
      console.log(result);
    };
    fetchEggDaily();
    // TODO: continue this
  }, []);

  const [category, setCategory] = React.useState("Produced");

  const selectOptions = ["Produced", "Rejected"];

  const dummyFormData = () => {
    const Produced = {
      id: "Produced",
      color: theme.palette.secondary.main,
      data: [
        { x: "Jan", y: 210 },
        { x: "Feb", y: 207 },
        { x: "Mar", y: 204 },
        { x: "Apr", y: 208 },
        { x: "May", y: 202 },
        { x: "Jun", y: 204 },
        { x: "Jul", y: 202 },
        { x: "Aug", y: 209 },
        { x: "Sep", y: 204 },
        { x: "Oct", y: 202 },
        { x: "Nov", y: 201 },
        { x: "Dec", y: 207 },
      ],
    };
    const Rejected = {
      id: "Rejected",
      color: theme.palette.secondary[600],
      data: [
        { x: "Jan", y: 21 },
        { x: "Feb", y: 20 },
        { x: "Mar", y: 20 },
        { x: "Apr", y: 28 },
        { x: "May", y: 20 },
        { x: "Jun", y: 24 },
        { x: "Jul", y: 22 },
        { x: "Aug", y: 29 },
        { x: "Sep", y: 24 },
        { x: "Oct", y: 22 },
        { x: "Nov", y: 21 },
        { x: "Dec", y: 27 },
      ],
    };
    // Use category state to select the appropriate data
    const selectedData = category === "Produced" ? Produced : Rejected;

    const formattedData = [selectedData];
    return formattedData;
  };

  return (
    <Box m="1.5rem 2.5rem">
      <div className=" flex justify-between items-center">
        <Header
          title="EGG REPORT"
          subtitle="Record of eggs produced and rejected."
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

export default Eggs;
