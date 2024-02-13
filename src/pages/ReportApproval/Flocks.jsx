import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

import ApprovalTable from "components/ApprovalTable";

function FlocksApproval() {
  const row = [
    {
      id: 1,
      date: "2024-02-13",
      active: 150,
      deceased: 5,
      sick: 10,
      cal: 20,
      others: 8,
    },
    {
      id: 2,
      date: "2024-02-14",
      active: 180,
      deceased: 8,
      sick: 15,
      cal: 25,
      others: 12,
    },
    {
      id: 3,
      date: "2024-02-15",
      active: 160,
      deceased: 7,
      sick: 12,
      cal: 18,
      others: 10,
    },
    {
      id: 4,
      date: "2024-02-16",
      active: 150,
      deceased: 10,
      sick: 20,
      cal: 30,
      others: 15,
    },
    {
      id: 5,
      date: "2024-02-17",
      active: 170,
      deceased: 6,
      sick: 18,
      cal: 22,
      others: 14,
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
      field: "active",
      headerName: "Active",
      width: 150,
    },
    {
      field: "deceased",
      headerName: "Deceased",
      width: 150,
    },
    {
      field: "sick",
      headerName: "Sick",
      width: 150,
    },
    {
      field: "cal",
      headerName: "Cal",
      width: 150,
    },
    {
      field: "others",
      headerName: "Others",
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

export default FlocksApproval;
