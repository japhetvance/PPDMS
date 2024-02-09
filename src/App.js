import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Login from "scenes/login";
import Layout from "scenes/layout";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Manager from "scenes/manager";
import Admin from "scenes/admin";
import Employee from "scenes/employee";
import axios from "axios";
import Egg from "scenes/egg";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Flocks from "scenes/flocks";
import Sales from "scenes/sales";
import Comparison from "scenes/comparison";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = (
        await axios.get(
          "http://localhost:5001/general/user/" +
            JSON.parse(sessionStorage.getItem("token")).userId
        )
      ).data;
      setUserData(result);
      console.log("data:", result);
    } catch (error) {}
  };

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              element={
                userData != "" ? <Layout /> : <Navigate to="/login" replace />
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/egg" element={<Egg />} />
              <Route path="/flocks" element={<Flocks />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/comparison" element={<Comparison />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
