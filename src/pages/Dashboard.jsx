import React, { Fragment, useEffect, useState, useRef } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  UploadOutlined,
  ShoppingBasket,
  Fence,
  Warehouse,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import { read, utils } from "xlsx";
import axios from "axios";

import dashboardService from "services/dashboard.service";
import ResponsiveLineChart from "components/DataVisualizationChart/ResponsiveLine";
import SalesTable from "components/Tables/SalesTable";
import HorizontalBarChart from "components/HorizontalBarChart";

const requiredFields = [
  "ID",
  "Year",
  "Month",
  "Day",
  "Eggs",
  "Rejected",
  "Sold",
  "Others",
  "Flocks",
  "Cages",
];

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  // Import state
  const [loading, setLoading] = useState(false);
  const [excelRows, setExcelRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmedImport, setConfirmedImport] = useState(false);
  const [rows, setRows] = useState([]);

  //new dashboard states
  const [eggsProduced, setEggsProduced] = useState([]);
  const [monthlyEggProd, setMonthlyEggProd] = useState([]);
  const [eggsProducedPercentage, setEggsProducedPercentage] = useState();

  const [eggsSold, setEggsSold] = useState([]);
  const [eggsSoldPercentage, setEggsSoldPercentage] = useState();

  const [flocksDet, setFlocksDet] = useState([]);

  //Line Graph State
  const [lineGraphData, setLineGraphData] = useState([]);

  //Load API on render
  useEffect(() => {
    const fetchEggsProducedData = async () => {
      try {
        const result = await dashboardService.eggProd();
        const sortedEggsProduced = [...result].sort((a, b) => a.week - b.week);

        setEggsProduced(sortedEggsProduced);
        // console.log(sortedEggsProduced);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchEggsSoldData = async () => {
      try {
        const result = await dashboardService.eggSales();
        const sortedEggsSold = [...result].sort((a, b) => a.week - b.week);

        setEggsSold(sortedEggsSold);
        console.log("sortedEggsSold: ", sortedEggsSold);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchFlocksData = async () => {
      try {
        const result = await dashboardService.flockDets();
        console.log(result);
        setFlocksDet(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMonthlyEggProf = async () => {
      try {
        const result = await dashboardService.monthlyEggProd();
        // console.log(result);
        setMonthlyEggProd(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEggsSoldData();
    fetchEggsProducedData();
    fetchFlocksData();
    fetchMonthlyEggProf();
  }, []);

  //Calculate percentage for produced
  useEffect(() => {
    if (eggsProduced.length > 0) {
      const lastItem = eggsProduced[eggsProduced.length - 1];
      const secondToLastItem = eggsProduced[eggsProduced.length - 2];

      // Calculate the percentage difference
      const lastItemValue =
        lastItem !== undefined ? parseInt(lastItem.total_eggs_produced, 10) : 0;
      const secondToLastItemValue =
        secondToLastItem !== undefined
          ? parseInt(secondToLastItem.total_eggs_produced, 10)
          : 0;

      const percentDifference = Math.round(
        ((lastItemValue - secondToLastItemValue) / secondToLastItemValue) * 100
      );

      // console.log(percentDifference);
      setEggsProducedPercentage(percentDifference.toString());
    } else {
      setEggsProducedPercentage("0");
    }
  }, [eggsProduced]);

  //Calculate percentage for sold
  useEffect(() => {
    if (eggsSold.length > 1) {
      const lastItem = eggsSold[eggsSold.length - 1];
      const secondToLastItem = eggsSold[eggsSold.length - 2];

      // Calculate the percentage difference
      const lastItemValue =
        lastItem !== undefined ? parseInt(lastItem.total_eggs_sales, 10) : 0;
      const secondToLastItemValue =
        secondToLastItem !== undefined
          ? parseInt(secondToLastItem.total_eggs_sales, 10)
          : 0;

      const percentDifference = Math.round(
        ((lastItemValue - secondToLastItemValue) / secondToLastItemValue) * 100
      );

      // console.log(percentDifference);
      setEggsSoldPercentage(percentDifference.toString());
    } else {
      setEggsSoldPercentage("0");
    }
  }, [eggsSold]);

  //Line Graph data
  useEffect(() => {
    const newArray = monthlyEggProd.map(({ year, month, total_egg_prod }) => ({
      x: month,
      y: total_egg_prod,
    }));
    setLineGraphData([
      {
        id: "Produced",
        color: theme.palette.secondary.main,
        data: newArray,
      },
    ]);
  }, [monthlyEggProd]);

  const removeFile = () => {
    setSelectedFile(null);
    setExcelRows([]);
    window.location.reload();
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Type of Transaction",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "products",
      headerName: "No. of Items",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DASHBOARD"
          subtitle="Poultry Monitoring System Dashboard"
        />

        {/* <label>
          <Button
            // onClick={handleButtonClick}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <UploadOutlined sx={{ mr: "10px" }} />
            Import Weekly Report
          </Button>
          <input
            id="inputEmpGroupFile"
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            // onChange={readUploadFile}
            style={{ display: "none" }}
          />
        </label> */}
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Weekly Eggs Produced"
          value={
            eggsProduced[eggsProduced.length - 1]
              ? eggsProduced[eggsProduced.length - 1].total_eggs_produced
              : 0
          }
          increase={eggsProducedPercentage && eggsProducedPercentage + "%"}
          description="Since last week"
          icon={
            <ShoppingBasket
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Weekly Eggs Sold"
          value={
            eggsSold[eggsSold.length - 1]
              ? "₱" + eggsSold[eggsSold.length - 1].total_eggs_sales
              : 0
          }
          increase={eggsSoldPercentage && eggsSoldPercentage + "%"}
          description="Since last week"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* Line Graph */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Egg Produced Overview
          </Typography>
          <ResponsiveLineChart data={lineGraphData} />
        </Box>

        <StatBox
          title="Flocks in Farm"
          value={
            flocksDet[flocksDet.length - 1]
              ? flocksDet[flocksDet.length - 1].flocks_number
              : 0
          }
          // increase="+5%"
          description="Since last month"
          icon={
            <Warehouse
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Vacant Cages"
          value={
            flocksDet[flocksDet.length - 1]
              ? flocksDet[flocksDet.length - 1].cage_available
              : 0
          }
          // increase="+43%"
          description="Since last month"
          icon={
            <Fence
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Transaction Table
          </Typography>
          <SalesTable />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Production Breakdown
          </Typography>
          <HorizontalBarChart />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for eggs made
            for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
