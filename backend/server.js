const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Inventory routes
app.get('/api/inventory', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM master_data');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/inventory', async (req, res) => {
  const { items_name, category, first_stock, unit } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO master_data (items_name, category, first_stock, unit) VALUES (?, ?, ?, ?)',
      [items_name, category, first_stock, unit]
    );
    res.status(201).json({ id: result.insertId, message: 'Item added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PIC routes
app.get('/api/pic', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pic');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/pic', async (req, res) => {
  const { pic_name, pic_phone_number, pic_email, pic_unit } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO pic (pic_name, pic_phone_number, pic_email, pic_unit) VALUES (?, ?, ?, ?)',
      [pic_name, pic_phone_number, pic_email, pic_unit]
    );
    res.status(201).json({ id: result.insertId, message: 'PIC added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});