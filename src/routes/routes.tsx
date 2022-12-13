import React from 'react';
import { createHashRouter } from 'react-router-dom';

import { App } from '../_app';
import { Details } from '../pages/Details';
import { Home } from './../pages/Home';

export const appRouters = createHashRouter([
  {
    path: '/',
    element: <App />,
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
