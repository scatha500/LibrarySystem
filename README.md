Library Management System

Technologies Used
Frontend: React (Hooks, React Router, Fetch API)
Backend: Express.js (Node.js)
Database: MySQL (via XAMPP)

Features
Dashboard: View book availability with low-stock warnings.
Book Management: Add, update, and delete books.
User Management: Add, update, and delete library members.
Transactions: Record borrowing, returns, and stock additions, with a full history log.

How to Run This Project Locally

1. Database Setup
Open XAMPP and start Apache and MySQL.
Go to http://localhost/phpmyadmin.
Click on the Import tab.
Select the database.sql file located inside the backend folder.
Click Go to automatically create the library_db database and all tables.

2. Backend Setup
Open a terminal and navigate to the backend folder.
Run npm install to install dependencies.
Run node server.js. The server will start on http://localhost:5000.

3. Frontend Setup
Open a new terminal and navigate to the frontend folder.
Run npm install.
Run npm start. The React app will open on http://localhost:3000.
