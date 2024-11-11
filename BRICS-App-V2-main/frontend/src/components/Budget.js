import React, { useState, useEffect } from 'react';
import { getBudget, updateBudget } from '../api';

function Budget() {
  const [budget, setBudget] = useState(null);
  const [newBudget, setNewBudget] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    async function fetchBudget() {
      try {
        const response = await getBudget();
        setBudget(response.amount);
        setCurrency(response.currency);
      } catch (err) {
        console.error("Failed to fetch budget:", err);
        alert("Error fetching budget. Please check your authentication.");
      }
    }
    fetchBudget();
  }, []);

  const handleUpdateBudget = async () => {
    try {
      await updateBudget({ amount: newBudget });
      setBudget(newBudget);
      setNewBudget('');
    } catch (err) {
      console.error("Failed to update budget:", err);
      alert("Error updating budget. Please check your authentication.");
    }
  };

  return (
    <div>
      <h2>Budget</h2>
      {budget !== null ? (
        <p>Current Budget: {currency} {budget}</p>
      ) : (
        <p>Loading budget...</p>
      )}
      <input
        type="number"
        value={newBudget}
        onChange={(e) => setNewBudget(e.target.value)}
        placeholder="Enter new amount"
      />
      <button onClick={handleUpdateBudget}>Update Budget</button>
    </div>
  );
}

export default Budget;