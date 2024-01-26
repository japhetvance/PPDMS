import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  colors,
} from "@mui/material";
import axios from 'axios';

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [userData, setUserData] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!sessionStorage.getItem("token")) {
      window.location = "/login"
    }
    try {
      const result = (await axios.get('http://localhost:5001/general/user/'+JSON.parse(sessionStorage.getItem("token")).userId)).data;
        setUserData(result);
        setUserRole(result.role)
      } catch (error) {
    }
  };
  const logout = () => {
    sessionStorage.removeItem("token")
    window.location = "/login"
  }

  var occupation;

  switch(userData.role) {
    case "superadmin":
      occupation = "Farm Owner";
      break;
    case "admin":
      occupation = "Manager";
      break;
    case "user":
      occupation = "Employee";
      break;
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

              <FlexBetween>
                <Button onClick={handleClick} 
                sx={{display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                textTransform: "none", 
                gap:"1rem"}}
                >
                  
                <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                />

                <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {userData.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {occupation}
                </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{color: theme.palette.secondary[300], fontSize: '25px'}}
                />

                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                  <MenuItem onClick={logout}>Log Out</MenuItem>
                </Menu>
              </FlexBetween>

          </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;