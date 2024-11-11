# BRICS Banking Application

## Overview
The BRICS Banking Application is a full-stack web application designed to provide banking services for BRICS nations (Brazil, Russia, India, China, and South Africa). It features separate interfaces for users and employees, with secure authentication and transaction management capabilities.

## Features

### User Features
- Account Registration and Login
- Budget Management
- Transaction History
- SWIFT Payment Processing
- Country-specific Currency Support
- Mobile-responsive Interface

### Employee Features
- Secure Employee Portal
- Payment History Monitoring
- Transaction Oversight
- Administrative Dashboard

## Technology Stack

### Frontend
- React.js
- React Router v6
- Context API for State Management
- CSS3 for Styling

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- CSRF Protection
- Rate Limiting

## Security Features
- Password Hashing (bcrypt)
- JWT Token Authentication
- CSRF Protection
- HTTP-Only Cookies
- Rate Limiting
- Helmet Security Headers
- Secure Session Management

## Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
   bash
git clone https://github.com/Dillon-Duncan/BRICS-App-V2-main.git
cd BRICS-App-V2

2. Install backend dependencies:
   bash
cd backend

3. Install frontend dependencies:
   bash
cd ../frontend
npm install

4. Create a .env file in the backend directory with the following variables:
   env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret
EMPLOYEE_USERNAME=default_employee_username
EMPLOYEE_PASSWORD=default_employee_password
PORT=8080

## Running the Application

1. Start the backend server:
   bash
cd backend
npm start

2. Start the frontend development server:
   bash
cd frontend
npm start

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/register` - User registration
- POST `/login` - User login
- POST `/employee-login` - Employee login
- GET `/csrf-token` - Get CSRF token

### Transactions
- POST `/transactions` - Create new transaction
- GET `/transactions` - Get user transactions
- POST `/swift-payment` - Process SWIFT payment

### Budget
- POST `/budget` - Update user budget
- GET `/budget` - Get user budget

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one special character

## Country-Specific Features
Each BRICS nation has specific:
- Currency codes
- Phone number formats
- Account number validations

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the ISC License.

## Acknowledgments
- React Community
- Node.js Community
