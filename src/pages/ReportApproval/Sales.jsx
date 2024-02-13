import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

import ApprovalTable from "components/ApprovalTable";

function SalesApproval() {
  const row = [
    {
      id: 1,
      date: "2024-02-13",
      eggCount: 150,
      size: "Medium",
      seller: "John Doe",
      buyer: "Alice Smith",
      price: 2.5,
    },
    {
      id: 2,
      date: "2024-02-14",
      eggCount: 180,
      size: "Large",
      seller: "Jane Smith",
      buyer: "Bob Johnson",
      price: 3.0,
    },
    {
      id: 3,
      date: "2024-02-15",
      eggCount: 160,
      size: "Small",
      seller: "Bob Johnson",
      buyer: "Charlie Wilson",
      price: 2.0,
    },
    {
      id: 4,
      date: "2024-02-16",
      eggCount: 200,
      size: "Extra Large",
      seller: "Alice Brown",
      buyer: "David Jones",
      price: 3.5,
    },
    {
      id: 5,
      date: "2024-02-17",
      eggCount: 170,
      size: "Medium",
      seller: "Charlie Wilson",
      buyer: "Emily Davis",
      price: 2.7,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "eggCount",
      headerName: "# of Eggs",
      width: 150,
    },
    {
      field: "size",
      headerName: "Size",
      width: 150,
    },
    {
      field: "seller",
      headerName: "Seller",
      width: 150,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Report Approval"
        subtitle="Manage reports made by employees about the flocks."
      />
      <div className="w-full py-5">
        <ApprovalTable row={row} columns={columns} />
      </div>
    </Box>
  );
}

export default SalesApproval;
