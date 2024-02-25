import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
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
    createdAt: "2/20/2024, 9:12:45 AM",
    updatedAt: "2/20/2024, 9:12:45 AM",
  },
  {
    id: 3,
    role: "user",
    username: "john_doe",
    action: "Update Profile",
    type: "profile",
    createdAt: "2/21/2024, 3:30:15 PM",
    updatedAt: "2/21/2024, 3:30:15 PM",
  },
  {
    id: 4,
    role: "editor",
    username: "content_editor",
    action: "Create New Post",
    type: "content",
    createdAt: "2/22/2024, 11:45:10 AM",
    updatedAt: "2/22/2024, 11:45:10 AM",
  },
  {
    id: 5,
    role: "manager",
    username: "project_manager",
    action: "Approve Request",
    type: "approval",
    createdAt: "2/23/2024, 4:18:30 PM",
    updatedAt: "2/23/2024, 4:18:30 PM",
  },
  {
    id: 6,
    role: "developer",
    username: "dev_user",
    action: "View Code Repository",
    type: "development",
    createdAt: "2/24/2024, 8:55:05 AM",
    updatedAt: "2/24/2024, 8:55:05 AM",
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
