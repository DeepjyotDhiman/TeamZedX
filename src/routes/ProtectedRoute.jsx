import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // If not logged in, send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role, send to their respective dashboard
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}