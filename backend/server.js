const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'library_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/books', (req, res) => {
    const { title, author, genre, isbn, quantity } = req.body;
    const sql = 'INSERT INTO books (title, author, genre, isbn, quantity) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, author, genre, isbn, quantity], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Book added' });
    });
});

app.put('/books/:id', (req, res) => {
    const { title, author, genre, isbn, quantity } = req.body;
    const sql = 'UPDATE books SET title=?, author=?, genre=?, isbn=?, quantity=? WHERE id=?';
    db.query(sql, [title, author, genre, isbn, quantity, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Book updated' });
    });
});

app.delete('/books/:id', (req, res) => {
    db.query('DELETE FROM books WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Book deleted' });
    });
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { name, membership_id, role } = req.body;
    const sql = 'INSERT INTO users (name, membership_id, role) VALUES (?, ?, ?)';
    db.query(sql, [name, membership_id, role], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User added' });
    });
});

app.put('/users/:id', (req, res) => {
    const { name, membership_id, role } = req.body;
    const sql = 'UPDATE users SET name=?, membership_id=?, role=? WHERE id=?';
    db.query(sql, [name, membership_id, role, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User updated' });
    });
});

app.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User deleted' });
    });
});

app.get('/transactions', (req, res) => {
    const sql = 'SELECT t.*, b.title as book_title, u.name as user_name FROM transactions t LEFT JOIN books b ON t.book_id = b.id LEFT JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/transactions', (req, res) => {
    const { book_id, user_id, type, quantity } = req.body;
    const sql = 'INSERT INTO transactions (book_id, user_id, type, quantity) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [book_id, user_id, type, quantity], (err, result) => {
        if (err) return res.status(500).json(err);
        
        let stockSql = '';
        if (type === 'borrow') stockSql = 'UPDATE books SET quantity = quantity - ? WHERE id = ?';
        if (type === 'return' || type === 'add_stock') stockSql = 'UPDATE books SET quantity = quantity + ? WHERE id = ?';

        if (stockSql) {
            db.query(stockSql, [quantity, book_id], (err2) => {
                if (err2) return res.status(500).json(err2);
                res.json({ message: 'Transaction successful' });
            });
        } else {
            res.json({ message: 'Transaction successful' });
        }
    });
});

app.delete('/transactions/:id', (req, res) => {
    db.query('DELETE FROM transactions WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Transaction deleted' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});