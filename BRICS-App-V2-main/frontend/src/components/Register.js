import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    surname: '',
    userName: '',
    idNumber: '',
    country: '',
    mobileNumber: '',
    accNumber: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.password.match(/^(?=.*[A-Z])(?=.*\W)[a-zA-Z\d\W]{8,}$/)) {
      setError('Password must contain at least 8 characters, one uppercase letter, and one special character.');
      return false;
    }
    if (!form.country) {
      setError('Please select a country');
      return false;
    }
    if (form.mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return false;
    }
    if (form.accNumber.length < 8) {
      setError('Account number must be at least 8 digits');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(form);
      alert('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Surname"
            required
          />
        </div>

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

        <div className="form-group">
          <input
            type="text"
            name="idNumber"
            value={form.idNumber}
            onChange={handleChange}
            placeholder="ID Number"
            pattern="[0-9]*"
            required
          />
        </div>

        <div className="form-group">
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="Brazil">Brazil</option>
            <option value="Russia">Russia</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="South Africa">South Africa</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            pattern="[0-9]*"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="accNumber"
            value={form.accNumber}
            onChange={handleChange}
            placeholder="Account Number"
            pattern="[0-9]*"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <small className="password-hint">
            Password must contain at least 8 characters, one uppercase letter, and one special character
          </small>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="register-button">
          Register
        </button>

        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register;