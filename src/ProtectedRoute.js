import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Cookies from "js-cookie";

//Roles
import SuperadminRoute from "routes/SuperadminRoute";
import AdminRoute from "routes/AdminRoute";
import ManagerRoute from "routes/ManagerRoute";
import EmployeeRoute from "routes/EmployeeRoute";

function ProtectedRoute() {
  const token = sessionStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/*"
        element={
          token === "superadmin" ? (
            <SuperadminRoute />
          ) : token === "admin" ? (
            <AdminRoute />
          ) : token === "manager" ? (
            <ManagerRoute />
          ) : token === "employee" ? (
            <EmployeeRoute />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default ProtectedRoute;
