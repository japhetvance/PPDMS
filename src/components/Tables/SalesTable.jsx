import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "product", headerName: "Product", width: 150 },
  { field: "quantity", headerName: "Quantity", width: 120 },
  { field: "price", headerName: "Price", width: 120 },
  { field: "date", headerName: "Date", width: 120 },
  { field: "customer", headerName: "Customer", width: 150 },
];

const rows = [
  {
    id: 1,
    product: "Widget A",
    quantity: 100,
    price: 10.99,
    date: "2024-02-27",
    customer: "John Doe",
  },
  {
    id: 2,
    product: "Widget B",
    quantity: 50,
    price: 24.99,
    date: "2024-02-28",
    customer: "Jane Smith",
  },
  {
    id: 3,
    product: "Widget C",
    quantity: 75,
    price: 14.49,
    date: "2024-02-28",
    customer: "Bob Johnson",
  },
  {
    id: 4,
    product: "Widget A",
    quantity: 30,
    price: 10.99,
    date: "2024-03-01",
    customer: "Alice Brown",
  },
  {
    id: 5,
    product: "Widget B",
    quantity: 20,
    price: 24.99,
    date: "2024-03-01",
    customer: "Charlie Davis",
  },
];

export default function SalesTable() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
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
