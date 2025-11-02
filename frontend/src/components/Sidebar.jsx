import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupIcon from '@mui/icons-material/Group';
import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const userRole = currentUser?.user?.role || null;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, roles: ["admin"] },
    { text: 'Post Management', icon: <WorkIcon />, path: "/layout/postManagement", roles: ["employee"] },
    { text: 'List Job Posts', icon: <WorkIcon />, path: "/layout/listPosts", roles: ["admin"] },
    { text: 'Employees Management', icon: <EngineeringIcon />, path: "/layout/listEmployees", roles: ["admin"] },
    //{ text: 'A Management', icon: <GroupIcon />, roles: ["employee","admin"] },
    { text: 'Profile', icon: <AccountCircleIcon />, path: "/layout/profile", roles: ["employee"] },
    { text: 'My Profile', icon: <AccountCircleIcon />, path: "/layout/adminProfile", roles: [ "admin"] }
  ];

  const isActive = (path) => location.pathname === path;
  const filtredMenu = menuItems.filter((item) => item.roles.includes(userRole));

  return (
    <Box
      sx={{
        backgroundColor: '#fcfcffff', // fond clair doux
        height: '100%',
        //color: '#333', // texte sombre par défaut
        minWidth: '220px',
        //borderRight: '1px solid #310d6dff'
      }}
    >
      <List>
        {filtredMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 1,
                color: '#230673ff', // texte par défaut
                //backgroundColor: 'transparent',
                '&.Mui-selected': {
                  backgroundColor: '#dd2571ff', // fond de champ sélectionné
                  color: 'white',               // texte blanc si sélectionné
                },
                '&:hover': {
                  backgroundColor: isActive(item.path) ? '#230673ff' : '#f4dae7ff', // hover
                  color: isActive(item.path) ? 'white' : '#1e3a8a',
                },
              }}
            >

              <ListItemIcon sx={{ color: isActive(item.path) ? 'white' : '#1f0760ff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
