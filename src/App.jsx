import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Features - matching your folder structure
import Login from './features/auth/Login';
import Register from './features/auth/Register';

// Routes Protection
import ProtectedRoute from './routes/ProtectedRoute';

// Pages - matching your folder structure
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Dashboard */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* My Profile Page - accessed via dashboard */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRole="employee">
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;