// components/ForceRedirect.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ForceRedirect = ({ children }) => {
  const isConnected = localStorage.getItem('isConnected'); // Check if the user is connected

  if (!isConnected) {
    return <Navigate to="/" />; // Redirect to login if not connected
  }

  return children;
};

export default ForceRedirect;
