import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import axios from 'axios';

var navItems = [ { text: "Dashboard", icon: <HomeOutlined />, }, { text: "Egg Production", icon: null, }, { text: "Overview", icon: <PointOfSaleOutlined />, }, { text: "Daily", icon: <TodayOutlined />, }, { text: "Monthly", icon: <CalendarMonthOutlined />, }, { text: "Breakdown", icon: <PieChartOutlined />, }, /*{ text: "Flock Monitoring", icon: null, }, { text: "Overviews", icon: <PointOfSaleOutlined />, }, { text: "Weekly", icon: <TodayOutlined />, }, { text: "Vaccination", icon: <CalendarMonthOutlined />, }, { text: "Recap", icon: <PieChartOutlined />, },*/ ];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = (await axios.get('http://localhost:5001/general/user/'+JSON.parse(sessionStorage.getItem("token")).userId)).data;
        setUserData(result);
        setUserRole(result.role)
      } catch (error) {
    }
  };

  if (userRole == "superadmin") {
    navItems = [ { text: "Dashboard", icon: <HomeOutlined />, }, { text: "Egg Production", icon: null, }, { text: "Overview", icon: <PointOfSaleOutlined />, }, { text: "Daily", icon: <TodayOutlined />, }, { text: "Monthly", icon: <CalendarMonthOutlined />, }, { text: "Breakdown", icon: <PieChartOutlined />, }, { text: "Management", icon: null, }, { text: "Admin", icon: <AdminPanelSettingsOutlined />, }, { text: "Transactions", icon: <ReceiptLongOutlined />, }, { text: "Insights", icon: <TrendingUpOutlined />, } ]
  }  else if (userRole == "admin") {
    navItems = [ { text: "Dashboard", icon: <HomeOutlined />, }, { text: "Egg Production", icon: null, }, { text: "Overview", icon: <PointOfSaleOutlined />, }, { text: "Daily", icon: <TodayOutlined />, }, { text: "Monthly", icon: <CalendarMonthOutlined />, }, { text: "Breakdown", icon: <PieChartOutlined />, }, { text: "Daily Report", icon: null, }, { text: "Manager", icon: <PointOfSaleOutlined />, } ]
  } else if (userRole == "user") {
    navItems = [ { text: "Dashboard", icon: <HomeOutlined />, }, { text: "Egg Production", icon: null, }, { text: "Overview", icon: <PointOfSaleOutlined />, }, { text: "Daily", icon: <TodayOutlined />, }, { text: "Monthly", icon: <CalendarMonthOutlined />, }, { text: "Breakdown", icon: <PieChartOutlined />, }, { text: "Daily Report", icon: null, }, { text: "Employee", icon: <TodayOutlined />, } ]
  }
  

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    CUEJILO FARMS
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;