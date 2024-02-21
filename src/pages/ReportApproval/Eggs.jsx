import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

import ApprovalTable from "components/Tables/ApprovalTable";

import reportApprovedService from "services/reportApproved.service";

function EggsApproval() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await reportApprovedService.fetchReportEgg();
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
      field: "egg_sm_produced",
      headerName: "Small",
      width: 150,
    },
    {
      field: "egg_md_produced",
      headerName: "Small",
      width: 150,
    },
    {
      field: "egg_lg_produced",
      headerName: "Small",
      width: 150,
    },
    {
      field: "rejected",
      headerName: "Rejected",
      width: 150,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Report Approval"
        subtitle="Manage reports made by employees about the eggs."
      />
      <div className="w-full py-5">
        <ApprovalTable row={row} columns={columns} />
      </div>
    </Box>
  );
}

export default EggsApproval;
