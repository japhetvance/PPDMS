import React, { useEffect, useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import "react-datepicker/dist/react-datepicker.css";
import DateTabs from "components/Tabs/DateTabs";
import SelectFilter from "components/SelectFilter";
import { Button } from "@mui/material";

//API
import visualizeService from "services/visualize.service";
import dashboardService from "services/dashboard.service";
import auditService from "services/audit.service";

//export
import { CSVLink, CSVDownload } from "react-csv";

const Eggs = () => {
  const token = sessionStorage.getItem("token");
  const theme = useTheme();
  const [dailyEgg, setDailyEgg] = useState([]);
  const [weeklyEgg, setWeeklyEgg] = useState([]);
  const [monthlyEgg, setMonthlyEgg] = useState([]);
  const [value, setValue] = React.useState(0);

  const [category, setCategory] = React.useState("Produced");
  const selectOptions = ["Produced", "Rejected"];

  useEffect(() => {
    //Fetch daily
    const fetchEggDaily = async () => {
      const result = await visualizeService.dailyEggVisualize();
      setDailyEgg(result);
    };

    //Fetch daily
    const fetchEggWeekly = async () => {
      const result = await visualizeService.weeklyEggVisualize();
      setWeeklyEgg(result);
    };

    //Fetch daily
    const fetchEggMonthly = async () => {
      const result = await dashboardService.monthlyEggProd();
      setMonthlyEgg(result);
    };

    fetchEggDaily();
    fetchEggWeekly();
    fetchEggMonthly();
  }, []);

  const dailyEggData = () => {
    const Produced = {
      id: "Produced",
      color: theme.palette.secondary.main,
      data: dailyEgg.slice(-7).map(({ egg_prod, createdAt }) => ({
        x: createdAt.slice(5, 10),
        y: egg_prod,
      })),
    };
    const Rejected = {
      id: "Rejected",
      color: theme.palette.secondary[600],
      data: dailyEgg.slice(-7).map(({ egg_reject, createdAt }) => ({
        x: createdAt.slice(5, 10),
        y: egg_reject,
      })),
    };
    // Use category state to select the appropriate data
    const selectedData = category === "Produced" ? Produced : Rejected;

    const formattedData = [selectedData];
    return formattedData;
  };

  const weeklyEggData = () => {
    const Produced = {
      id: "Produced",
      color: theme.palette.secondary.main,
      data: weeklyEgg
        .map(({ eggProd }) =>
          eggProd.slice(-4).map(({ week, total_egg_prod }) => ({
            x: week,
            y: total_egg_prod,
          }))
        )
        .flat(),
    };
    const Rejected = {
      id: "Rejected",
      color: theme.palette.secondary[600],
      data: weeklyEgg
        .map(({ eggReject }) =>
          eggReject.slice(-4).map(({ week, total_egg_reject }) => ({
            x: week,
            y: total_egg_reject,
          }))
        )
        .flat(),
    };
    // Use category state to select the appropriate data
    const selectedData = category === "Produced" ? Produced : Rejected;

    const formattedData = [selectedData];
    return formattedData;
  };

  const monthlyEggData = () => {
    const Produced = {
      id: "Produced",
      color: theme.palette.secondary.main,
      data: monthlyEgg.slice(-12).map(({ month, total_egg_prod }) => ({
        x: month,
        y: total_egg_prod,
      })),
    };
    // TODO: insert the rejected here.
    const Rejected = {
      id: "Rejected",
      color: theme.palette.secondary[600],
      data: monthlyEgg.map(({ month, total_egg_prod }) => ({
        x: month,
        y: total_egg_prod,
      })),
    };
    // Use category state to select the appropriate data
    const selectedData = category === "Produced" ? Produced : Rejected;

    const formattedData = [selectedData];
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
          title="EGG REPORT"
          subtitle="Record of eggs produced and rejected."
        />

        <div className="flex justify-center gap-2">
          <CSVLink
            data={value === 0 ? dailyEgg : value === 1 ? weeklyEgg : monthlyEgg}
            filename={`egg_export_${
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
            daily={dailyEggData()}
            weekly={weeklyEggData()}
            monthly={monthlyEggData()}
            value={value}
            setValue={setValue}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Eggs;
