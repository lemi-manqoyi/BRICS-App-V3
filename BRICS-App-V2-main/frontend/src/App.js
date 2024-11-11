import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Budget from './components/Budget';
import Transactions from './components/Transactions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <h1>BRICS Banking</h1>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee-dashboard" 
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/budget" 
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/transactions" 
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;