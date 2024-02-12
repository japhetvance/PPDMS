import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabsComparison from "components/Tabs/DateTabsComparison";

const Comparison = () => {
  const data = [];

  const generateMonthData = (
    month,
    eggProduced,
    eggSold,
    eggRejected,
    activeFlocks,
    eggProducedColor,
    eggSoldColor,
    eggRejectedColor,
    activeFlocksColor
  ) => {
    return {
      date: month,
      eggProduced,
      eggSold,
      eggRejected,
      activeFlocks,
      eggProducedColor,
      eggSoldColor,
      eggRejectedColor,
      activeFlocksColor,
    };
  };

  const eggProducedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const eggSoldValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const eggRejectedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const activeFlocksValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < months.length; i++) {
    const month = months[i];
    const eggProduced = eggProducedValues[i];
    const eggSold = eggSoldValues[i];
    const eggRejected = eggRejectedValues[i];
    const activeFlocks = activeFlocksValues[i];

    const eggProducedColor = "hsl(120, 70%, 50%)";
    const eggSoldColor = "hsl(240, 70%, 50%)";
    const eggRejectedColor = "hsl(0, 70%, 50%)";
    const activeFlocksColor = "hsl(60, 70%, 50%)";

    data.push(
      generateMonthData(
        month,
        eggProduced,
        eggSold,
        eggRejected,
        activeFlocks,
        eggProducedColor,
        eggSoldColor,
        eggRejectedColor,
        activeFlocksColor
      )
    );
  }

  const formattedData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Eggs Produced",
        data: data.map((item) => item.eggProduced),
        backgroundColor: data.map((item) => item.eggProducedColor),
      },
      {
        label: "Eggs Sold",
        data: data.map((item) => item.eggSold),
        backgroundColor: data.map((item) => item.eggSoldColor),
      },
      {
        label: "Eggs Rejected",
        data: data.map((item) => item.eggRejected),
        backgroundColor: data.map((item) => item.eggRejectedColor),
      },
      {
        label: "Active Flocks",
        data: data.map((item) => item.activeFlocks),
        backgroundColor: data.map((item) => item.activeFlocksColor),
      },
    ],
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SALES STATISTICS" subtitle="Overview of sales." />
      <Box height="75vh">
        <Box>
          <DateTabsComparison data={formattedData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Comparison;
