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
  const [eggsProducedPercentage, setEggsProducedPercentage] = useState();

  const [eggsSold, setEggsSold] = useState([]);
  const [eggsSoldPercentage, setEggsSoldPercentage] = useState();

  const [flocksDet, setFlocksDet] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const result = (
  //       await axios.get("http://localhost:5001/general/dashboard")
  //     ).data;
  //     setRows(result);
  //     setLoading(false);
  //     console.log("data:", result);
  //     console.log("latestFlocks:", result && result.latestFlocks);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
        // console.log(sortedEggsSold);
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

    fetchEggsSoldData();
    fetchEggsProducedData();
    fetchFlocksData();
  }, []);

  useEffect(() => {
    if (eggsProduced.length > 0) {
      const lastItem = eggsProduced[eggsProduced.length - 1];
      const secondToLastItem = eggsProduced[eggsProduced.length - 2];

      // Calculate the percentage difference
      const lastItemValue = parseInt(lastItem.total_eggs_produced, 10);
      const secondToLastItemValue = parseInt(
        secondToLastItem.total_eggs_produced,
        10
      );

      const percentDifference = Math.round(
        ((lastItemValue - secondToLastItemValue) / secondToLastItemValue) * 100
      );

      // console.log(percentDifference);
      setEggsProducedPercentage(percentDifference.toString());
    } else {
      setEggsProducedPercentage("0");
    }
  }, [eggsProduced]);

  useEffect(() => {
    if (eggsSold.length > 0) {
      const lastItem = eggsSold[eggsSold.length - 1];
      const secondToLastItem = eggsSold[eggsSold.length - 2];

      // Calculate the percentage difference
      const lastItemValue = parseInt(lastItem.total_eggs_sales, 10);
      const secondToLastItemValue = parseInt(
        secondToLastItem.total_eggs_sales,
        10
      );

      const percentDifference = Math.round(
        ((lastItemValue - secondToLastItemValue) / secondToLastItemValue) * 100
      );

      // console.log(percentDifference);
      setEggsSoldPercentage(percentDifference.toString());
    } else {
      setEggsSoldPercentage("0");
    }
  }, [eggsSold]);

  // const readUploadFile = (e) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     setSelectedFile(file);
  //     setConfirmedImport(false);
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const data = e.target.result;
  //       const workbook = read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const json = utils.sheet_to_json(worksheet);
  //       console.log("excelRows", excelRows);
  //       console.log("json", json);
  //       setExcelRows(json);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  // const openDialog = () => {
  //   setConfirmedImport(false);
  //   setSelectedFile(null);
  // };

  // const confirmImport = () => {
  //   setConfirmedImport(true);
  // };

  // const uploadData = async () => {
  //   try {
  //     setLoading(true);
  //     const firstItemKeys = excelRows[0] && Object.keys(excelRows[0]);
  //     const requiredValidation = firstItemKeys.length
  //       ? !requiredFields.every((element) => firstItemKeys.includes(element))
  //       : false;

  //     if (requiredValidation) {
  //       alert("Required fields: " + JSON.stringify(requiredFields));
  //       setLoading(false);
  //       return;
  //     }

  //     const jokesResponse = (await axios.get("http://localhost:5001/api/jokes"))
  //       .data;
  //     const jokeList = jokesResponse || [];

  //     const jokes = excelRows.map((obj) => ({
  //       _id: jokeList.find((x) => x.eggId == obj["ID"])?._id,
  //       eggId: obj["ID"] || "",
  //       year: obj["Year"] || "",
  //       month: obj["Month"] || "",
  //       day: obj["Day"] || "",
  //       eggs: obj["Eggs"] || "",
  //       rejected: obj["Rejected"] || "",
  //       sold: obj["Sold"] || "",
  //       others: obj["Others"] || "",
  //       flock: obj["Flocks"] || "",
  //       cages: obj["Cages"] || "",
  //     }));

  //     const updatedJokes = jokes.filter((x) => x._id);
  //     const newJokes = jokes.filter((x) => !x._id);

  //     const promises = [];
  //     if (updatedJokes.length) {
  //       promises.push(
  //         axios.post(
  //           "http://localhost:5001/bulk/jokes-bulk-update",
  //           updatedJokes
  //         )
  //       );
  //     }
  //     if (newJokes.length) {
  //       promises.push(
  //         axios.post("http://localhost:5001/bulk/jokes-bulk-insert", newJokes)
  //       );
  //     }

  //     Promise.all(promises)
  //       .then(() => {
  //         fetchData();
  //         alert("Data updated successfully");
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         console.log("uploadData error: ", error);
  //       });
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("uploadData error: ", error);
  //   }
  // };

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

  // const handleButtonClick = () => {
  //   // Trigger a click on the hidden file input when the button is clicked
  //   fileInputRef.current.click();
  // };

  // const handleConfirmImport = () => {
  //   uploadData(); // Call the uploadData function
  //   openDialog(); // Close the dialog
  // };

  // Define the file name variable
  // const fileName = selectedFile ? selectedFile.name : "";

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DASHBOARD"
          subtitle="Poultry Monitoring System Dashboard"
        />

        <label>
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
        </label>
      </FlexBetween>

      {/* Confirmation Dialog */}
      {/* <Dialog open={selectedFile && !confirmedImport} onClose={openDialog}>
        <DialogTitle style={{ fontSize: "24px" }}>Confirm Import</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontSize: "20px" }}>
            Are you sure you want to import data from{" "}
            <strong>{fileName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={openDialog}
            style={{ fontSize: "18px" }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmImport}
            style={{ fontSize: "18px" }}
            color="success"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}

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
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Flocks in Farm"
          value={
            flocksDet[flocksDet.length - 1]
              ? flocksDet[flocksDet.length - 1].flocks_number
              : 0
          }
          increase="+5%"
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
          increase="+43%"
          description="Since last month"
          icon={
            <Fence
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
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
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => rows._id}
            rows={rows.transactions || 0 || []}
            columns={columns}
          />
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
          <BreakdownChart isDashboard={true} />
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
