import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
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
    width: 150,
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 2,
    role: "admin",
    username: "admin_user",
    action: "View Dashboard",
    type: "navigation",
    createdAt: "2/20/2024",
    updatedAt: "2/20/2024",
  },
  {
    id: 3,
    role: "user",
    username: "john_doe",
    action: "Update Profile",
    type: "profile",
    createdAt: "2/21/2024",
    updatedAt: "2/21/2024",
  },
  {
    id: 4,
    role: "editor",
    username: "content_editor",
    action: "Create New Post",
    type: "content",
    createdAt: "2/22/2024",
    updatedAt: "2/22/2024",
  },
  {
    id: 5,
    role: "manager",
    username: "project_manager",
    action: "Approve Request",
    type: "approval",
    createdAt: "2/23/2024",
    updatedAt: "2/23/2024",
  },
  {
    id: 6,
    role: "developer",
    username: "dev_user",
    action: "View Code Repository",
    type: "development",
    createdAt: "2/24/2024",
    updatedAt: "2/24/2024",
  },
];
export default function AuditTable() {
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
