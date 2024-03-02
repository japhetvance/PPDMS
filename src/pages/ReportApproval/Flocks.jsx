import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import ApprovalTable from "components/Tables/ApprovalTable";

import reportApprovedService from "services/reportApproved.service";

function FlocksApproval() {
  const token = sessionStorage.getItem("token");
  const [row, setRow] = useState([]);

  const handleApprove = async (id) => {
    try {
      const result = await reportApprovedService.flocksReportApproved(
        id,
        "approved",
        token
      );

      toast.success("Approved successfully.");
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
      const result = await reportApprovedService.flocksReportApproved(
        id,
        "rejected",
        token
      );

      toast.success("Rejected successfully.");
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
      width: 100,
    },
    {
      field: "additional_flocks",
      headerName: "Additional",
      width: 100,
    },
    {
      field: "deceased_flocks",
      headerName: "Deceased",
      width: 100,
    },
    {
      field: "sick_flocks",
      headerName: "Sick",
      width: 100,
    },
    {
      field: "cal",
      headerName: "Cal",
      width: 100,
    },
    {
      field: "flocks_number_before",
      headerName: "Before",
      width: 100,
    },
    {
      field: "flocks_number_after",
      headerName: "After",
      width: 100,
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
        title="Flocks Report Approval"
        subtitle="Manage reports made by employees about the flocks."
      />
      <div className="w-full py-5">
        <ApprovalTable row={row} columns={columns} />
      </div>
    </Box>
  );
}

export default FlocksApproval;
