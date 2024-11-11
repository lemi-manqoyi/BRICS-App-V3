import React, { useState, useEffect } from 'react';
import { createTransaction, getTransactions } from '../api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [transactionName, setTransactionName] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await getTransactions();
        setTransactions(response);
        setError(null);
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error("Failed to fetch transactions:", err);
        alert("Error fetching transactions. Please check your authentication.");
      }
    }
    fetchTransactions();
  }, []);

  const handleAddTransaction = async () => {
    if (!transactionName || !transactionAmount || !transactionType) {
      setError("Please fill in all fields");
      return;
    }

    const newTransaction = {
      name: transactionName,
      amount: parseFloat(transactionAmount),
      type: transactionType
    };

    try {
      const response = await createTransaction(newTransaction);
      setTransactions([...transactions, response]);
      setTransactionName('');
      setTransactionAmount('');
      setTransactionType('');
      setError(null);
    } catch (err) {
      setError("Failed to add transaction");
      console.error("Failed to add transaction:", err);
      alert("Error adding transaction. Please check your authentication.");
    }
  };

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="transaction-form">
        <input
          type="text"
          value={transactionName}
          onChange={(e) => setTransactionName(e.target.value)}
          placeholder="Transaction Name"
          required
        />
        <input
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="payment">Payment</option>
          <option value="transfer">Transfer</option>
        </select>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.name}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Transactions;