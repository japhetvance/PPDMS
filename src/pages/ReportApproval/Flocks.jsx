import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

import ApprovalTable from "components/Tables/ApprovalTable";

import reportApprovedService from "services/reportApproved.service";

function FlocksApproval() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await reportApprovedService.fetchReportFlock();
      setRow(result);
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "additional_flocks",
      headerName: "Active",
      width: 150,
    },
    {
      field: "deceased_flocks",
      headerName: "Deceased",
      width: 150,
    },
    {
      field: "sick_flocks",
      headerName: "Sick",
      width: 150,
    },
    {
      field: "cal",
      headerName: "Cal",
      width: 150,
    },
    {
      field: "flocks_number_before",
      headerName: "Before",
      width: 150,
    },
    {
      field: "flocks_number_after",
      headerName: "After",
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
