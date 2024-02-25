import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Header from "components/Header";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import ApprovalTable from "components/Tables/ApprovalTable";

import reportApprovedService from "services/reportApproved.service";

function EggsApproval() {
  const token = sessionStorage.getItem("token");
  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await reportApprovedService.fetchReportEgg();
      // console.log(result);
      setRow(result);
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const result = await reportApprovedService.eggReportApproved(
        id,
        "approved",
        token
      );

      toast.success("Approved successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
      const result = await reportApprovedService.eggReportApproved(
        id,
        "rejected",
        token
      );

      toast.success("Rejected successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

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
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
        title="Egg Report Approval"
        subtitle="Manage reports made by employees about the eggs."
      />
      <div className="w-full py-5">
        <ApprovalTable row={row} columns={columns} />
      </div>
    </Box>
  );
}

export default EggsApproval;
