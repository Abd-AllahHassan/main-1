import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
      </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);