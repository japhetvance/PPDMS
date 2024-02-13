import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";

function Admin() {
  return (
    <Box m="1.5rem 2.5rem">
      <div className=" flex justify-between items-center">
        <Header title="Manage Users" subtitle="Manage registered users." />
      </div>
    </Box>
  );
}

export default Admin;
