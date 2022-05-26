import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import { DataProvider } from './context/storeProvider';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
