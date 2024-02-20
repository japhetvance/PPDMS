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
import axios from "axios";

//redux
import { useSelector } from "react-redux";

const roleSpecificNavItems = {
  superadmin: [
    { link: "/dashboard", text: "Dashboard", icon: <HomeOutlined /> },
    { link: "/", text: "Data Visualization", icon: null },
    { link: "/data/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/data/flocks", text: "Flocks", icon: <TodayOutlined /> },
    { link: "/data/sales", text: "Sales", icon: <CalendarMonthOutlined /> },
    {
      link: "/data/comparison",
      text: "Comparison",
      icon: <PieChartOutlined />,
    },
    { link: "/", text: "Daily Report", icon: null },
    { link: "/report/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/report/flocks", text: "Flocks", icon: <TodayOutlined /> },
    { link: "/report/sales", text: "Sales", icon: <CalendarMonthOutlined /> },
    { link: "/", text: "Report Approval", icon: null },
    { link: "/approval/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/approval/flocks", text: "Flocks", icon: <TodayOutlined /> },
    {
      link: "/approval/sales",
      text: "Sales",
      icon: <CalendarMonthOutlined />,
    },
    { link: "/", text: "Management", icon: null },
    {
      link: "/management/admin",
      text: "Admin",
      icon: <PointOfSaleOutlined />,
    },
    {
      link: "/management/inventory",
      text: "Inventory",
      icon: <TodayOutlined />,
    },
    {
      link: "/management/insights",
      text: "Insights",
      icon: <CalendarMonthOutlined />,
    },
    {
      link: "/management/audit",
      text: "Audit",
      icon: <CalendarMonthOutlined />,
    },
  ],
  admin: [
    { link: "/dashboard", text: "Dashboard", icon: <HomeOutlined /> },
    { link: "/", text: "Data Visualization", icon: null },
    { link: "/data/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/data/flocks", text: "Flocks", icon: <TodayOutlined /> },
    { link: "/data/sales", text: "Sales", icon: <CalendarMonthOutlined /> },
    {
      link: "/data/comparison",
      text: "Comparison",
      icon: <PieChartOutlined />,
    },
    { link: "/", text: "Report Approval", icon: null },
    { link: "/approval/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/approval/flocks", text: "Flocks", icon: <TodayOutlined /> },
    {
      link: "/approval/sales",
      text: "Sales",
      icon: <CalendarMonthOutlined />,
    },
    { link: "/", text: "Management", icon: null },
    {
      link: "/management/admin",
      text: "Admin",
      icon: <PointOfSaleOutlined />,
    },
    {
      link: "/management/inventory",
      text: "Inventory",
      icon: <TodayOutlined />,
    },
    {
      link: "/management/insights",
      text: "Insights",
      icon: <CalendarMonthOutlined />,
    },
    {
      link: "/management/audit",
      text: "Audit",
      icon: <CalendarMonthOutlined />,
    },
  ],
  manager: [
    { link: "/dashboard", text: "Dashboard", icon: <HomeOutlined /> },
    { link: "/", text: "Data Visualization", icon: null },
    { link: "/data/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/data/flocks", text: "Flocks", icon: <TodayOutlined /> },
    { link: "/data/sales", text: "Sales", icon: <CalendarMonthOutlined /> },
    {
      link: "/data/comparison",
      text: "Comparison",
      icon: <PieChartOutlined />,
    },
    { link: "/", text: "Report Approval", icon: null },
    { link: "/approval/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/approval/flocks", text: "Flocks", icon: <TodayOutlined /> },
    {
      link: "/approval/sales",
      text: "Sales",
      icon: <CalendarMonthOutlined />,
    },
  ],
  employee: [
    { link: "/", text: "Daily Report", icon: null },
    { link: "/report/egg", text: "Egg", icon: <PointOfSaleOutlined /> },
    { link: "/report/flocks", text: "Flocks", icon: <TodayOutlined /> },
    { link: "/report/sales", text: "Sales", icon: <CalendarMonthOutlined /> },
  ],
};

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const role = useSelector((state) => state.global.role);
  const [navItems, setNavItems] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setNavItems(roleSpecificNavItems[role]);
  }, [role]);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // const [userData, setUserData] = useState(null);
  // const [userRole, setUserRole] = useState(null);

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
              {navItems &&
                navItems.map(({ link, text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(link);
                          setActive(link);
                        }}
                        sx={{
                          backgroundColor:
                            active === link
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === link
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === link
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === link && (
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
