import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import ManageUsersTable from "components/Tables/ManageUsersTable";

function Admin() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Manage Users" subtitle="Manage registered users." />
      <div className="w-full py-5">
        <ManageUsersTable />
      </div>
    </Box>
  );
}

export default Admin;
