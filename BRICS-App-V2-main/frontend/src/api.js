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

  const data = await response.json();
  if (!data.success || !data.data || !data.data.token) {
    throw new Error('Invalid response from server');
  }

  return data;
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

export async function getBudget() {
  const token = await getCsrfToken();
  const response = await fetch('/api/budget', {
    method: 'POST', 
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

export async function updateBudget(budgetData) {
  const token = await getCsrfToken();
  const response = await fetch('/api/budget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify(budgetData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || 'Failed to update budget');
  }

  return response.json();
}

export async function getTransactions() {
    const token = await getCsrfToken();
    console.log("Token for getTransactions:", token); // Log the token
    const response = await fetch('/api/transactions', {
      method: 'POST', 
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

export async function createTransaction(transactionData) {
  const token = await getCsrfToken();
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