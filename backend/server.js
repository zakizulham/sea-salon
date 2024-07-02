const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Initialize the app and database
const app = express();
const db = new sqlite3.Database(':memory:');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      service TEXT,
      datetime TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      stars INTEGER,
      comment TEXT
    )
  `);
});

// Routes
app.post('/reservations', (req, res) => {
  const { name, phone, service, datetime } = req.body;
  const stmt = db.prepare('INSERT INTO reservations (name, phone, service, datetime) VALUES (?, ?, ?, ?)');
  stmt.run(name, phone, service, datetime, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
  stmt.finalize();
});

app.post('/reviews', (req, res) => {
  const { name, stars, comment } = req.body;
  const stmt = db.prepare('INSERT INTO reviews (name, stars, comment) VALUES (?, ?, ?)');
  stmt.run(name, stars, comment, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
  stmt.finalize();
});

app.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
