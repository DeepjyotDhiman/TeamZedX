import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Features
import Login from './features/auth/Login';
import Register from './features/auth/Register';

// Routes & Protection
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes: Accessible by anyone */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Routes: 
          Requires 'employee' role and provides access to personal stats [cite: 14, 23, 39]
        */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin/HR Routes: 
          Requires 'admin' role and provides management/approval privileges [cite: 13, 22, 46]
        */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Root Redirect: Ensures users start at the Login page  */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 Redirect: Catch-all for undefined routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;