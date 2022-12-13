import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { router } from './routes/routes';
import { configuredStore, persistor } from './store/store';

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
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
