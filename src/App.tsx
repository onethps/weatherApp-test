import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/routes';

export const App = () => {
  return <RouterProvider router={router} />;
};
