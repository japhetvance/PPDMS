import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabs from "components/Tabs/DateTabs";
import SelectFilter from "components/SelectFilter";
import { Button } from "@mui/material";

//API
import visualizeService from "services/visualize.service";
import auditService from "services/audit.service";

//export
import { CSVLink, CSVDownload } from "react-csv";

const Flocks = () => {
  const token = sessionStorage.getItem("token");
  const theme = useTheme();
  const [dailyFlocks, setDailyFlocks] = useState([]);
  const [weeklyFlocks, setWeeklyFlocks] = useState([]);
  const [monthlyFlocks, setMonthlyFlocks] = useState([]);
  const [value, setValue] = React.useState(0);

  const [category, setCategory] = React.useState("Active");
  const selectOptions = ["Active", "Deceased", "Sick", "Cal"];

  useEffect(() => {
    const fetchDailyFlocks = async () => {
      const result = await visualizeService.dailyFlocksVisualize();
      const transformedData = Object.entries(result.dailyCounts).map(
        ([date, values]) => ({
          date,
          ...values,
        })
      );
      setDailyFlocks(transformedData);
    };

    const fetchWeeklyFlocks = async () => {
      const result = await visualizeService.weeklyFlocksVisualize();
      const transformedData = Object.entries(result.weeklyCounts).map(
        ([date, values]) => ({
          date,
          ...values,
        })
      );
      setWeeklyFlocks(transformedData);
    };

    const fetchMonthlyFlocks = async () => {
      const result = await visualizeService.monthlyFlocksVisualize();
      setMonthlyFlocks(result);
    };

    fetchDailyFlocks();
    fetchWeeklyFlocks();
    fetchMonthlyFlocks();
  }, []);

  const dailyFlockData = () => {
    let selectedData;

    switch (category) {
      case "Active":
        selectedData = {
          id: "Active",
          color: theme.palette.secondary.main,
          data: dailyFlocks.slice(-7).map(({ date, additional_flocks }) => ({
            x: date,
            y: additional_flocks,
          })),
        };
        break;
      case "Deceased":
        selectedData = {
          id: "Deceased",
          color: theme.palette.secondary.main,
          data: dailyFlocks.slice(-7).map(({ date, deceased_flocks }) => ({
            x: date,
            y: deceased_flocks,
          })),
        };
        break;
      case "Sick":
        selectedData = {
          id: "Sick",
          color: theme.palette.secondary.main,
          data: dailyFlocks.slice(-7).map(({ date, sick_flocks }) => ({
            x: date,
            y: sick_flocks,
          })),
        };
        break;
      case "Cal":
        selectedData = {
          id: "Cal",
          color: theme.palette.secondary.main,
          data: dailyFlocks.slice(-7).map(({ date, cal }) => ({
            x: date,
            y: cal,
          })),
        };
        break;
      default:
        selectedData = null;
    }

    const formattedData = selectedData ? [selectedData] : [];
    return formattedData;
  };

  const weeklyFlockData = () => {
    let selectedData;

    switch (category) {
      case "Active":
        selectedData = {
          id: "Active",
          color: theme.palette.secondary.main,
          data: weeklyFlocks.slice(-4).map(({ date, additional_flocks }) => ({
            x: date,
            y: additional_flocks,
          })),
        };
        break;
      case "Deceased":
        selectedData = {
          id: "Deceased",
          color: theme.palette.secondary.main,
          data: weeklyFlocks.slice(-4).map(({ date, deceased_flocks }) => ({
            x: date,
            y: deceased_flocks,
          })),
        };
        break;
      case "Sick":
        selectedData = {
          id: "Sick",
          color: theme.palette.secondary.main,
          data: weeklyFlocks.slice(-4).map(({ date, sick_flocks }) => ({
            x: date,
            y: sick_flocks,
          })),
        };
        break;
      case "Cal":
        selectedData = {
          id: "Cal",
          color: theme.palette.secondary.main,
          data: weeklyFlocks.slice(-4).map(({ date, cal }) => ({
            x: date,
            y: cal,
          })),
        };
        break;
      default:
        selectedData = null;
    }

    const formattedData = selectedData ? [selectedData] : [];
    return formattedData;
  };

  const monthlyFlockData = () => {
    let selectedData;

    switch (category) {
      case "Active":
        selectedData = {
          id: "Active",
          color: theme.palette.secondary.main,
          data: monthlyFlocks.map(({ month, total_additional_flocks }) => ({
            x: month,
            y: parseInt(total_additional_flocks, 10),
          })),
        };
        break;
      case "Deceased":
        selectedData = {
          id: "Deceased",
          color: theme.palette.secondary.main,
          data: monthlyFlocks.map(({ month, total_deceased_flocks }) => ({
            x: month,
            y: parseInt(total_deceased_flocks, 10),
          })),
        };
        break;
      case "Sick":
        selectedData = {
          id: "Sick",
          color: theme.palette.secondary.main,
          data: monthlyFlocks.map(({ month, total_sick_flocks }) => ({
            x: month,
            y: parseInt(total_sick_flocks, 10),
          })),
        };
        break;
      case "Cal":
        selectedData = {
          id: "Cal",
          color: theme.palette.secondary.main,
          data: monthlyFlocks.map(({ month, total_cal }) => ({
            x: month,
            y: parseInt(total_cal, 10),
          })),
        };
        break;
      default:
        selectedData = null;
    }

    const formattedData = selectedData ? [selectedData] : [];
    return formattedData;
  };

  const handleExport = async (filter) => {
    await auditService.postAudit(
      `Exported the ${filter} egg report.`,
      "Download Export",
      token
    );
  };

  return (
    <Box m="1.5rem 2.5rem">
      <div className=" flex justify-between items-center">
        <Header
          title="FLOCKS REPORT"
          subtitle="Record of flocks according to their status."
        />
        <div className="flex justify-center gap-2">
          <CSVLink
            data={
              value === 0
                ? dailyFlocks
                : value === 1
                ? weeklyFlocks
                : monthlyFlocks
            }
            filename={`flocks_export_${
              value === 0 ? "daily" : value === 1 ? "weekly" : "monthly"
            }.csv`}
          >
            <Button
              variant="contained"
              sx={{ height: "100%" }}
              onClick={() =>
                handleExport(
                  value === 0 ? "daily" : value === 1 ? "weekly" : "monthly"
                )
              }
            >
              Export Data
            </Button>
          </CSVLink>
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
            daily={dailyFlockData()}
            weekly={weeklyFlockData()}
            monthly={monthlyFlockData()}
            value={value}
            setValue={setValue}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Flocks;
