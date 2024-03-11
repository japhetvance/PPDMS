import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import "./App.css";

import Login from "scenes/login";
import ForgotPassword from "scenes/login/ForgotPassword";
import ResetPassword from "scenes/login/ResetPassword";
import ProtectedRoute from "ProtectedRoute";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<ProtectedRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot/password" element={<ForgotPassword />} />
            <Route path="/reset/password" element={<ResetPassword />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
