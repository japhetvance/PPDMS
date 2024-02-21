import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Roles
import SuperadminRoute from "routes/SuperadminRoute";
import AdminRoute from "routes/AdminRoute";
import ManagerRoute from "routes/ManagerRoute";
import EmployeeRoute from "routes/EmployeeRoute";
import Login from "scenes/login";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "state";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const role = useSelector((state) => state.global.role);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenAndSetUser = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          const { userId, username, email, role } = decodedToken;

          dispatch(
            setUser({
              userId,
              username,
              email,
              role,
            })
          );
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      setLoading(false);
    };
    checkTokenAndSetUser();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {token && role ? (
        <Routes>
          <Route
            path="/*"
            element={
              role === "superadmin" ? (
                <SuperadminRoute />
              ) : role === "admin" ? (
                <AdminRoute />
              ) : role === "manager" ? (
                <ManagerRoute />
              ) : role === "employee" ? (
                <EmployeeRoute />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default ProtectedRoute;
