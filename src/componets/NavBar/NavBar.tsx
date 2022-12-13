import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material/';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux-hooks';

export const NavBar = () => {
  const loadingCardListStatus = useAppSelector(state => state.home.loading);
  const loadingDetailsStatus = useAppSelector(state => state.details.loading);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" color="inherit" component="div">
              Weather App
            </Typography>
          </Link>
        </Toolbar>
        {loadingCardListStatus && <LinearProgress />}
        {loadingDetailsStatus && <LinearProgress />}
      </AppBar>
    </Box>
  );
};
