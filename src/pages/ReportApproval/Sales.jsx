import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";

import ApprovalTable from "components/Tables/ApprovalTable";

import reportApprovedService from "services/reportApproved.service";

function SalesApproval() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await reportApprovedService.fetchReportSales();
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
      field: "quantity",
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "egg_type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "buyer_name",
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
