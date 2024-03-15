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

const Sales = () => {
  const token = sessionStorage.getItem("token");
  const theme = useTheme();
  const [dailySales, setDailySales] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [value, setValue] = React.useState(0);

  //SIZE
  const [category, setCategory] = React.useState("Small");
  const selectOptions = ["Small", "Medium", "Large"];

  //CATEGORY
  const [category2, setCategory2] = React.useState("Quantity");
  const selectOptions2 = ["Quantity", "Price"];

  useEffect(() => {
    const fetchDailySalesQuantity = async () => {
      const resultQuantity =
        await visualizeService.dailySalesQuantityVisualize();
      const resultPrice = await visualizeService.dailySalesPriceVisualize();

      if (category2 === "Quantity") {
        setDailySales(resultQuantity);
      } else {
        setDailySales(resultPrice);
      }
    };
    const fetchWeeklySalesQuantity = async () => {
      const resultQuantity =
        await visualizeService.weeklySalesQuantityVisualize();
      const resultPrice = await visualizeService.weeklySalesPriceVisualize();

      if (category2 === "Quantity") {
        setWeeklySales(resultQuantity);
      } else {
        setWeeklySales(resultPrice);
      }
    };
    const fetchMonthlySalesQuantity = async () => {
      const resultQuantity =
        await visualizeService.monthlySalesQuantityVisualize();
      const resultPrice = await visualizeService.monthlySalesPriceVisualize();

      if (category2 === "Quantity") {
        setMonthlySales(resultQuantity);
      } else {
        setMonthlySales(resultPrice);
      }
    };

    fetchDailySalesQuantity();
    fetchWeeklySalesQuantity();
    fetchMonthlySalesQuantity();
  }, [category2]);

  const dailySaleData = () => {
    let selectedData;

    switch (category) {
      case "Small":
        selectedData = {
          id: "Small",
          color: theme.palette.secondary.main,
          data: dailySales.slice(-7).map(({ date, egg_sm }) => ({
            x: date,
            y: egg_sm,
          })),
        };
        break;
      case "Medium":
        selectedData = {
          id: "Medium",
          color: theme.palette.secondary.main,
          data: dailySales.slice(-7).map(({ date, egg_md }) => ({
            x: date,
            y: egg_md,
          })),
        };
        break;
      case "Large":
        selectedData = {
          id: "Large",
          color: theme.palette.secondary.main,
          data: dailySales.slice(-7).map(({ date, egg_lg }) => ({
            x: date,
            y: egg_lg,
          })),
        };
        break;
      default:
        selectedData = null;
    }

    const formattedData = selectedData ? [selectedData] : [];
    return formattedData;
  };

  const weeklySaleData = () => {
    let selectedData;

    switch (category) {
      case "Small":
        selectedData = {
          id: "Small",
          color: theme.palette.secondary.main,
          data: weeklySales.slice(-7).map(({ week_start, egg_sm }) => ({
            x: week_start,
            y: egg_sm,
          })),
        };
        break;
      case "Medium":
        selectedData = {
          id: "Medium",
          color: theme.palette.secondary.main,
          data: weeklySales.slice(-7).map(({ week_start, egg_md }) => ({
            x: week_start,
            y: egg_md,
          })),
        };
        break;
      case "Large":
        selectedData = {
          id: "Large",
          color: theme.palette.secondary.main,
          data: weeklySales.slice(-7).map(({ week_start, egg_lg }) => ({
            x: week_start,
            y: egg_lg,
          })),
        };
        break;
      default:
        selectedData = null;
    }

    const formattedData = selectedData ? [selectedData] : [];
    return formattedData;
  };

  const monthlySaleData = () => {
    let selectedData;

    switch (category) {
      case "Small":
        selectedData = {
          id: "Small",
          color: theme.palette.secondary.main,
          data: monthlySales.slice(-7).map(({ month, egg_sm }) => ({
            x: month,
            y: egg_sm,
          })),
        };
        break;
      case "Medium":
        selectedData = {
          id: "Medium",
          color: theme.palette.secondary.main,
          data: monthlySales.slice(-7).map(({ month, egg_md }) => ({
            x: month,
            y: egg_md,
          })),
        };
        break;
      case "Large":
        selectedData = {
          id: "Large",
          color: theme.palette.secondary.main,
          data: monthlySales.slice(-7).map(({ month, egg_lg }) => ({
            x: month,
            y: egg_lg,
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
          title="SALES REPORT"
          subtitle="Record of sales and profits for eggs."
        />
        <div className="flex justify-center gap-2">
          <CSVLink
            data={
              value === 0
                ? dailySales
                : value === 1
                ? weeklySales
                : monthlySales
            }
            filename={`sales_export_${
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
          <SelectFilter
            category={category2}
            setCategory={setCategory2}
            selectOptions={selectOptions2}
          />
        </div>
      </div>
      <Box height="75vh">
        <Box>
          <DateTabs
            daily={dailySaleData()}
            weekly={weeklySaleData()}
            monthly={monthlySaleData()}
            value={value}
            setValue={setValue}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sales;
