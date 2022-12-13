import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import { NavBar } from '../NavBar/NavBar';

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Box mt={10}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};
