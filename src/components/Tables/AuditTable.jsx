import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

//api
import auditService from "services/audit.service";

export default function AuditTable() {
  const [auditData, setAuditData] = React.useState([]);

  React.useEffect(() => {
    const fetchAudit = async () => {
      const result = await auditService.fetchAudit();
      setAuditData(result);
      console.log("AuditData: ", result);
    };
    fetchAudit();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      editable: true,
    },
  ];

  return (
    <Box sx={{ height: "30rem", width: "100%" }}>
      <DataGrid
        rows={auditData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
