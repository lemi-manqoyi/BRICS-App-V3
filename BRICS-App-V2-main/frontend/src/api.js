const BASE_URL = 'http://localhost:8080';
let csrfToken = null;

async function getCsrfToken() {
  if (!csrfToken) {
    const response = await fetch(`${BASE_URL}/csrf-token`, {
      credentials: 'include'
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
  }
  return csrfToken;
}

export async function registerUser(userData) {
  const token = await getCsrfToken();
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'CSRF-Token': token
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Registration failed');
  }

  return response.json();
}

export async function loginUserAPI({ username, password, accNumber }) {
  const token = await getCsrfToken();
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'CSRF-Token': token
    },
    credentials: 'include',
    body: JSON.stringify({ userName: username, password, accNumber }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Invalid login');
  }

  return response.json();
}

export async function loginEmployeeAPI({ username, password }) {
  const token = await getCsrfToken();
  const response = await fetch(`${BASE_URL}/employee-login`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'CSRF-Token': token
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Invalid login');
  }

  return response.json();
}

// Budget related API calls
export async function getBudget(token) {
  const response = await fetch('/api/budget', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Failed to fetch budget');
  }

  return response.json();
}

export async function updateBudget(budgetData, token) {
  const response = await fetch('/api/budget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(budgetData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Failed to update budget');
  }

  return response.json();
}

// Transaction related API calls
export async function getTransactions(token) {
  const response = await fetch('/api/transactions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Failed to fetch transactions');
  }

  return response.json();
}

export async function createTransaction(transactionData, token) {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transactionData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Failed to create transaction');
  }

  return response.json();
}