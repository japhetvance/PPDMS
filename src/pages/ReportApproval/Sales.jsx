import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import ApprovalTable from "components/Tables/ApprovalTable";

import reportApprovedService from "services/reportApproved.service";

function SalesApproval() {
  const token = sessionStorage.getItem("token");
  const [row, setRow] = useState([]);

  const handleApprove = async (id) => {
    try {
      const result = await reportApprovedService.salesReportApproved(
        id,
        "approved",
        token
      );
      console.log(result);
      toast.success(result.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const handleReject = async (id) => {
    try {
      const result = await reportApprovedService.salesReportApproved(
        id,
        "rejected",
        token
      );
      console.log(result);
      toast.success(result.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

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
      renderCell: (params) => {
        const eggType = params.value;

        // Display corresponding text based on egg_type
        let displayText = "";
        switch (eggType) {
          case "egg_sm":
            displayText = "Small";
            break;
          case "egg_md":
            displayText = "Medium";
            break;
          case "egg_lg":
            displayText = "Large";
            break;
          default:
            displayText = "Unknown";
        }

        return displayText;
      },
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
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) =>
        params.row.status === "pending" ? (
          <div className="flex gap-2">
            <GridActionsCellItem
              icon={<CheckIcon sx={{ color: "green" }} />}
              label="Approve"
              onClick={() => handleApprove(params.row.id)}
              color="inherit"
              sx={{
                border: "1px solid green",
                borderRadius: 1,
              }}
            />
            <GridActionsCellItem
              icon={<CloseIcon sx={{ color: "red" }} />}
              label="Reject"
              onClick={() => handleReject(params.row.id)}
              color="inherit"
              sx={{
                border: "1px solid red",
                borderRadius: 1,
              }}
            />
          </div>
        ) : null,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Sales Report Approval"
        subtitle="Manage reports made by employees about the sales."
      />
      <div className="w-full py-5">
        <ApprovalTable row={row} columns={columns} />
      </div>
    </Box>
  );
}

export default SalesApproval;
