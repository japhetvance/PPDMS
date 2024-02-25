import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import AuditTable from "components/Tables/AuditTable";

function DataAudit() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Data Trail Overview"
        subtitle="Data trail of user of the system."
      />
      <div className="w-full py-5">
        <AuditTable />
      </div>
    </Box>
  );
}

export default DataAudit;
