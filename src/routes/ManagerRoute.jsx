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

function ManagerRoute() {
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
      </Route>
    </Routes>
  );
}

export default ManagerRoute;
