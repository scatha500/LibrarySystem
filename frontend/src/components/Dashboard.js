import React from 'react';

function Dashboard({ books }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Current Book Availability</h3>
      
      <div className="card-grid">
        {books.map((book) => {
          const isLowStock = book.quantity < 2;
          
          return (
            <div key={book.id} className={`book-card ${isLowStock ? 'low-stock' : ''}`}>
              <h4>{book.title}</h4>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Stock:</strong> {book.quantity}</p>
              {isLowStock && <p className="low-stock-text">⚠ Low Stock!</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;