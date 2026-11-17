import React, { useState } from 'react';

function TransactionForm({ books, users, onTransactionAdded }) {
  const [transaction, setTransaction] = useState({
    book_id: '',
    user_id: '',
    type: 'borrow',
    quantity: 1
  });

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    })
      .then(res => res.json())
      .then(() => {
        setTransaction({ book_id: '', user_id: '', type: 'borrow', quantity: 1 });
        onTransactionAdded();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Record Transaction</h3>
      
      <div className="form-group">
        <select name="book_id" value={transaction.book_id} onChange={handleChange} required>
          <option value="">Select a Book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title} (Stock: {book.quantity})</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select name="user_id" value={transaction.user_id} onChange={handleChange} required>
          <option value="">Select a User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name} ({user.membership_id})</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <select name="type" value={transaction.type} onChange={handleChange}>
          <option value="borrow">Borrow Book</option>
          <option value="return">Return Book</option>
          <option value="add_stock">Add Stock</option>
        </select>
      </div>

      <div className="form-group">
        <input name="quantity" type="number" min="1" value={transaction.quantity} onChange={handleChange} required />
      </div>

      <button type="submit">Submit Transaction</button>
    </form>
  );
}

export default TransactionForm;