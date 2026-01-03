import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // If not logged in, send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role, redirect to their assigned dashboard
  if (allowedRole && user.role !== allowedRole) {
    const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}