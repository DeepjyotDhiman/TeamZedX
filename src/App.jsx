import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Features
import Login from './features/auth/Login';
import Register from './features/auth/Register';

// Routes Protection
import ProtectedRoute from './routes/ProtectedRoute';

// Pages & Components
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import AdminPayroll from './features/payroll/AdminPayroll';
import EmployeePayroll from './features/payroll/EmployeePayroll';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Access */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- EMPLOYEE ROUTES --- */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Specific Profile Route */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRole="employee">
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        {/* Employee Personal Payroll View */}
        <Route 
          path="/dashboard/payroll" 
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeePayroll />
            </ProtectedRoute>
          } 
        />

        {/* --- ADMIN ROUTES --- */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* Admin Payroll Management Control */}
        <Route 
          path="/admin/payroll" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPayroll />
            </ProtectedRoute>
          } 
        />

        {/* --- SYSTEM REDIRECTS --- */}
        {/* Land on login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Catch-all: redirect broken links to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;