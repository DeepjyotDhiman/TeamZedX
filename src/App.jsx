import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null); // Simple state to mock login

  return (
    <Routes>
      <Route path="/" element={<div>Welcome to Dayflow - Please Sign In</div>} />
      {/* Protect these routes later based on user role */}
      <Route path="/employee-dashboard" element={<div>Employee View</div>} />
      <Route path="/admin-dashboard" element={<div>Admin/HR View</div>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;