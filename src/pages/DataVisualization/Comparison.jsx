import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabsComparison from "components/Tabs/DateTabsComparison";

const Comparison = () => {
  const data = {
    produced: [12, 34, 56, 78, 90, 45, 45, 67, 12, 78, 12, 11],
    sold: [89, 23, 45, 67, 12, 78, 12, 34, 56, 78, 90, 67],
    rejected: [56, 90, 23, 78, 12, 45, 45, 67, 12, 78, 12, 23],
    active: [45, 67, 12, 78, 12, 45, 56, 90, 23, 78, 12, 89],
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SALES STATISTICS" subtitle="Overview of sales." />
      <Box height="75vh">
        <Box>
          <DateTabsComparison data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default Comparison;
