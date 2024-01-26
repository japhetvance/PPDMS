import React, { useMemo, useState, Fragment, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, useTheme, Button } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetEggsQuery } from "state/api";
import "react-datepicker/dist/react-datepicker.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const Employee = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data } = useGetEggsQuery();
  const [formData, setFormData] = useState([]);
  const [user, setUser] = useState("");
  const [dateValue, setDateValue] = useState(Date(Date.now()));
  const theme = useTheme();

  useEffect(() => {
    const fetch = async () => {
      try {
      const userFetch = await axios.get(`http://localhost:5001/general/user/${JSON.parse(sessionStorage.getItem("token")).userId}`);
        setUser(userFetch.data.name);
      } catch (error) {
        console.log('Error sending form data:', error);
      }
    }
    fetch();
  }, [])
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      date: dateValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/general/temp', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response) {
        setFormData(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  };

  const date = new Date();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EMPLOYEE REPORT" subtitle="Record of eggs sold and produced " />
      <Box height="75vh">
        <Box sx={{padding: "5em"}} component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        ADD REPORT
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <input
            type="hidden"
            id="userName"
            name="userName"
            onChange= {handleUserChange}
            value={user}  />
          <input
            type="hidden"
            id="year"
            name="year"
            value={date.getFullYear()}  />
          <input
            type="hidden"
            id="month"
            name="month"
            value={date.getMonth()} />
          <input
            type="hidden"
            id="day"
            name="day"
            value={date.getDate()} />
          <TextField
            required
            id="eggs"
            name="eggs"
            label="Eggs"
            fullWidth
            autoComplete="eggs"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rejected"
            name="rejected"
            label="Rejected"
            fullWidth
            autoComplete="rejected"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="sold"
            name="sold"
            label="Sold"
            fullWidth
            autoComplete="sold"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="others"
            name="others"
            label="Others"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="flock"
            name="flock"
            label="Flock"
            fullWidth
            autoComplete="flock"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cages"
            name="cages"
            label="Cages"
            fullWidth
            autoComplete="cages"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <DatePicker
              variant="outlined"
              type="date"
              required
              id="date"
              name="date"
              label="Date"
              autoComplete="date"
              fullWidth
              sx={{width: "100%"}}
              onChange={(newValue) => setDateValue(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Button
              type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: theme.palette.secondary[300], color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
              >
                SUBMIT
              </Button>
        </Grid>
      </Grid>
    </Box>
        
      </Box>
    </Box>
  );
};

export default Employee;