import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Details } from '../pages/Details';
import { Layout } from './../componets/Layout/Layout';
import { Home } from './../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'details/:city',
        element: <Details />,
      },
    ],
  },
]);
