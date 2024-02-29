import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import dashboardService from "services/dashboard.service";

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
