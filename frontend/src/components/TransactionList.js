import React from 'react';

function TransactionList({ transactions, onTransactionDeleted }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => onTransactionDeleted())
      .catch(err => console.error(err));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Book</th>
          <th>User</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{new Date(t.created_at).toLocaleString()}</td>
            <td>{t.book_title || 'Deleted Book'}</td>
            <td>{t.user_name || 'Deleted User'}</td>
            <td>{t.type}</td>
            <td>{t.quantity}</td>
            <td>
              <button className="delete-btn" onClick={() => handleDelete(t.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionList;