import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  const [editingBook, setEditingBook] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchBooks = () => {
    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  };

  const fetchUsers = () => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };

  const fetchTransactions = () => {
    fetch('http://localhost:5000/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  };

  const refreshAll = () => {
    fetchBooks();
    fetchUsers();
    fetchTransactions();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/books">Book Management</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/users">User Management</Link>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard books={books} />} />
            
            <Route path="/books" element={
              <div>
                <h1>Book Management</h1>
                <BookForm 
                  onBookAdded={refreshAll} 
                  editingBook={editingBook} 
                  setEditingBook={setEditingBook} 
                />
                <BookList 
                  books={books} 
                  onBookDeleted={refreshAll} 
                  setEditingBook={setEditingBook} 
                />
              </div>
            } />
            
            <Route path="/transactions" element={
              <div>
                <h1>Transactions</h1>
                <TransactionForm books={books} users={users} onTransactionAdded={refreshAll} />
                <h3>Transaction History</h3>
                <TransactionList transactions={transactions} onTransactionDeleted={refreshAll} />
              </div>
            } />
            
            <Route path="/users" element={
              <div>
                <h1>User Management</h1>
                <UserForm 
                  onUserAdded={refreshAll} 
                  editingUser={editingUser} 
                  setEditingUser={setEditingUser} 
                />
                <UserList 
                  users={users} 
                  onUserDeleted={refreshAll} 
                  setEditingUser={setEditingUser} 
                />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;