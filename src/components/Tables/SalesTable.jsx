import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import dashboardService from "services/dashboard.service";
import axios from "axios"

export default function SalesTable() {
  const [row, setRow] = React.useState([]);
  React.useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const result = await dashboardService.salesTable();
        setRow(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSalesData();
  }, []);

  React.useEffect(() =>{
    const fetchReports = async () =>{
      try {
        const data = await axios.get("https://13.211.142.147/api/fetch/egg/visualization")
        console.log(data.data)
        // setRow(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchReports()
  }, [])

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "buyer_name", headerName: "Buyer", width: 120 },
    {
      field: "egg_type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => {
        if (params.value === "egg_sm") {
          return "Small";
        } else if (params.value === "egg_md") {
          return "Medium";
        } else {
          return "Large";
        }
      },
    },
    { field: "quantity", headerName: "Quantity", width: 90 },
    { field: "price", headerName: "Price", width: 90 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={row}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
