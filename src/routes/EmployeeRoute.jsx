import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "pages/DataVisualization/Layout";

//Import Daily Report
import EggsReport from "pages/DailyReport/Eggs";
import FlocksReport from "pages/DailyReport/Flocks";
import SalesReport from "pages/DailyReport/Sales";

function EmployeeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<EggsReport />} />
        <Route path="/report/egg" element={<EggsReport />} />
        <Route path="/report/flocks" element={<FlocksReport />} />
        <Route path="/report/sales" element={<SalesReport />} />
      </Route>
    </Routes>
  );
}

export default EmployeeRoute;
