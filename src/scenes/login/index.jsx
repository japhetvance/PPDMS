import { useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Link, Checkbox, Button, Typography, useTheme, useMediaQuery, Container, TextField, Avatar, CssBaseline, FormControlLabel } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {

  const theme = useTheme();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/login', JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(response.data)
      if (response) {
        const token = await JSON.stringify(response.data);
        sessionStorage.setItem('token', token);
        window.location = "/dashboard"
      }
    } catch (error) {
      console.log('Error sending form data:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
          <Box
            sx={{
              padding: '2em',
              bgcolor: theme.palette.primary[500],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px'
            }}
          >
            <Typography variant="h2" sx={{ color: theme.palette.secondary[200] }} fontWeight="bold">
              CUEJILO FARMS
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: '1.4em', color: theme.palette.secondary[500] }} fontWeight="bold">
              Poultry Monitoring System
            </Typography>
            <Typography component="h1" variant="h5" sx={{ alignSelf: 'start' }}>
              LOG IN
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: theme.palette.secondary[300], color: theme.palette.primary[500], fontWeight: 700, ":hover": {bgcolor: theme.palette.secondary[100]} }}
              >
                LOG IN
              </Button>
            </Box>
          </Box>
      </Box>
    </Container>
  );
}