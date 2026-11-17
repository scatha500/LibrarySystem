import React, { useState, useEffect } from 'react';

function BookForm({ onBookAdded, editingBook, setEditingBook }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    quantity: ''
  });

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
    } else {
      setBook({ title: '', author: '', genre: '', isbn: '', quantity: '' });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingBook 
      ? `http://localhost:5000/books/${editingBook.id}` 
      : 'http://localhost:5000/books';
    
    const method = editingBook ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(() => {
        setBook({ title: '', author: '', genre: '', isbn: '', quantity: '' });
        setEditingBook(null);
        onBookAdded();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingBook ? 'Update Book' : 'Add New Book'}</h3>
      <div className="form-group">
        <input name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <input name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} />
      </div>
      <div className="form-group">
        <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
      </div>
      <div className="form-group">
        <input name="quantity" type="number" placeholder="Quantity" value={book.quantity} onChange={handleChange} required />
      </div>
      <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
      {editingBook && (
        <button type="button" style={{ marginLeft: '10px', backgroundColor: '#888' }} onClick={() => setEditingBook(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default BookForm;