import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Budget from './Budget';
import Transactions from './Transactions';

function UserDashboard() {
  const { user } = useAuth();
  const [budget, setBudget] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch user data here
    // This is a placeholder for actual API calls
    setBudget({ amount: 1000, currency: 'USD' });
    setTransactions([]);
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <Link to="/budget">Budget</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/login">Logout</Link>
      </nav>
      
      <div className="dashboard-content">
        <h1>Welcome, {user?.userName || 'User'}!</h1>
        
        <div className="dashboard-widgets">
          <div className="widget">
            <Budget />
          </div>
          
          <div className="widget">
            <Transactions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;