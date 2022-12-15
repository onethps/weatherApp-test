import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import reportWebVitals from './reportWebVitals';
import { appRouters } from './routes';
import { configuredStore, persistor } from './store';

const themeLight = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={configuredStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={createTheme(themeLight)}>
          <CssBaseline />
          <RouterProvider router={appRouters} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
