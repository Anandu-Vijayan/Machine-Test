import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Assembly from './components/Assembly';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { AssemblyProvider } from './context/AssemblyContext';
import ProtectedRoute from './components/ProtectedRoutes';

const App = () => {
  return (
    <AuthProvider>
      <AssemblyProvider>
        <Router>
          <Routes>
          <Route path="/" element={<ProtectedRoute element={<Auth />} />} />
            <Route path="/assembly" element={<Assembly />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </AssemblyProvider>
    </AuthProvider>
  );
};

export default App;
