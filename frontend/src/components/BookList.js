import React from 'react';

function BookList({ books, onBookDeleted, setEditingBook }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => onBookDeleted())
      .catch(err => console.error(err));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>ISBN</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.isbn}</td>
            <td>{book.quantity}</td>
            <td>
              <button onClick={() => setEditingBook(book)} style={{ marginRight: '10px' }}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookList;