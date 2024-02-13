import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function ApprovalTable({ row, columns }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={row} columns={columns} slots={{ toolbar: GridToolbar }} />
    </div>
  );
}
