import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import axios from "axios";
import "./App.css";

import Login from "scenes/login";

//Roles
import SuperadminRoute from "routes/SuperadminRoute";
import AdminRoute from "routes/AdminRoute";
import ManagerRoute from "routes/ManagerRoute";
import EmployeeRoute from "routes/EmployeeRoute";

function App() {
  const token = sessionStorage.getItem("token");
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {token === "superadmin" ? (
              <Route path="/*" element={<SuperadminRoute />} />
            ) : token === "admin" ? (
              <Route path="/*" element={<AdminRoute />} />
            ) : token === "manager" ? (
              <Route path="/*" element={<ManagerRoute />} />
            ) : token === "employee" ? (
              <Route path="/*" element={<EmployeeRoute />} />
            ) : null}
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
