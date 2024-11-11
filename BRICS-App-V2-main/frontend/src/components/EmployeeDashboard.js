import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const EmployeeDashboard = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsResponse, accountsResponse] = await Promise.all([
          fetch('/api/payment-history', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }),
          fetch('/api/user-accounts', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          })
        ]);

        if (!paymentsResponse.ok || !accountsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const payments = await paymentsResponse.json();
        const accounts = await accountsResponse.json();

        setPaymentHistory(payments);
        setUserAccounts(accounts);
        setError(null);
      } catch (error) {
        setError('Error fetching dashboard data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'employee') {
      fetchData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="employee-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">BRICS Banking - Employee Portal</div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="dashboard-content">
        <h2>Employee Dashboard</h2>
        
        <div className="dashboard-section">
          <h3>User Accounts</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Account Number</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAccounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.userName}</td>
                  <td>{account.accNumber}</td>
                  <td>{account.balance}</td>
                  <td>{account.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h3>Payment History</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Payment Name</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.userName}</td>
                  <td>{payment.name}</td>
                  <td>{payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;