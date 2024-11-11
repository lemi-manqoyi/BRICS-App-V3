import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { loginUserAPI, loginEmployeeAPI } from '../api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const { login } = useAuth();
  const [isEmployee, setIsEmployee] = useState(false);
  const [form, setForm] = useState({
    userName: '',
    accNumber: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEmployee) {
        // Employee login
        const response = await loginEmployeeAPI({
          username: form.userName,
          password: form.password
        });
        login({ ...response, role: 'employee' });
        navigate('/employee-dashboard');
      } else {
        // User login
        const response = await loginUserAPI({
          username: form.userName,
          password: form.password,
          accNumber: form.accNumber
        });
        login({ ...response, role: 'user' });
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isEmployee ? 'Employee Login' : 'User Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

        {!isEmployee && (
          <div className="form-group">
            <input
              type="text"
              name="accNumber"
              value={form.accNumber}
              onChange={handleChange}
              placeholder="Account Number"
              required
            />
          </div>
        )}

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={isEmployee ? "Employee Password" : "Password"}
            required
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={isEmployee}
              onChange={() => {
                setIsEmployee(!isEmployee);
                setForm({ userName: '', accNumber: '', password: '' });
                setError(null);
              }}
            />
            Employee Login
          </label>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-button">
          Login
        </button>

        {!isEmployee && (
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;