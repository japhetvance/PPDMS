import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import Layout from "pages/DataVisualization/Layout";

//Import Data Visualization
import EggsGraph from "pages/DataVisualization/Eggs";
import FlocksGraph from "pages/DataVisualization/Flocks";
import SalesGraph from "pages/DataVisualization/Sales";
import ComparisonGraph from "pages/DataVisualization/Comparison";

//Import Report Approval
import EggsApproval from "pages/ReportApproval/Eggs";
import FlocksApproval from "pages/ReportApproval/Flocks";
import SalesApproval from "pages/ReportApproval/Sales";

//Import Manageent
import Admin from "pages/Management/Admin";
import Inventory from "pages/Management/Inventory";
import Insights from "pages/Management/Insights";
import DataAudit from "pages/Management/DataAudit";

function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data/egg" element={<EggsGraph />} />
        <Route path="/data/flocks" element={<FlocksGraph />} />
        <Route path="/data/sales" element={<SalesGraph />} />
        <Route path="/data/comparison" element={<ComparisonGraph />} />
        <Route path="/approval/egg" element={<EggsApproval />} />
        <Route path="/approval/flocks" element={<FlocksApproval />} />
        <Route path="/approval/sales" element={<SalesApproval />} />
        <Route path="/management/admin" element={<Admin />} />
        <Route path="/management/inventory" element={<Inventory />} />
        <Route path="/management/insights" element={<Insights />} />
        <Route path="/management/audit" element={<DataAudit />} />
      </Route>
    </Routes>
  );
}

export default AdminRoute;
