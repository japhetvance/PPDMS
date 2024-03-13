import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabsComparison from "components/Tabs/DateTabsComparison";

//api
import visualizeService from "services/visualize.service";

const Comparison = () => {
  const [dailyData, setDailyData] = useState({
    produced: [],
    sold: [],
    rejected: [],
    date: [],
  });
  const [weeklyData, setWeeklyData] = useState({
    produced: [],
    sold: [],
    rejected: [],
    date: [],
  });
  const [monthlyData, setMonthlyData] = useState({
    produced: [],
    sold: [],
    rejected: [],
    date: [],
  });

  useEffect(() => {
    const fetchDailyComparison = async () => {
      const result = await visualizeService.dailyComparisonVisualize();
      const newData = {
        produced: [],
        sold: [],
        rejected: [],
        date: [],
      };

      const startIndex = Math.max(0, result.length - 7);
      for (let i = startIndex; i < result.length; i++) {
        const obj = result[i];
        newData.produced.push(obj.egg_prod);
        newData.sold.push(obj.egg_sales);
        newData.rejected.push(obj.egg_reject);
        newData.date.push(obj.createdAt);
      }
      setDailyData(newData);
    };
    const fetchWeeklyComparison = async () => {
      const result = await visualizeService.weeklyComparisonVisualize();
      const newData = {
        produced: [],
        sold: [],
        rejected: [],
        date: [],
      };

      const startIndex = Math.max(0, result.length - 4);
      for (let i = startIndex; i < result.length; i++) {
        const obj = result[i];
        newData.produced.push(obj.total_egg_prod);
        newData.sold.push(obj.total_egg_sales);
        newData.rejected.push(obj.total_egg_reject);
        newData.date.push(obj.start_of_week);
      }
      setWeeklyData(newData);
    };
    const fetchMonthlyComparison = async () => {
      const result = await visualizeService.monthlyComparisonVisualize();
      console.log("result: ", result);
      const newData = {
        produced: [],
        sold: [],
        rejected: [],
        date: [],
      };

      const startIndex = Math.max(0, result.length - 12);
      for (let i = startIndex; i < result.length; i++) {
        const obj = result[i];
        newData.produced.push(obj.total_egg_prod);
        newData.sold.push(obj.total_egg_sales);
        newData.rejected.push(obj.total_egg_reject);
        newData.date.push(obj.month);
      }
      setMonthlyData(newData);
    };

    fetchDailyComparison();
    fetchWeeklyComparison();
    fetchMonthlyComparison();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SALES STATISTICS" subtitle="Overview of sales." />
      <Box height="75vh">
        <Box>
          <DateTabsComparison
            daily={dailyData && dailyData}
            weekly={weeklyData && weeklyData}
            monthly={monthlyData && monthlyData}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Comparison;
