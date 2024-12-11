const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/submit-feedback', (req, res) => {
  const { ratings, feedback } = req.body;

  const query = `
    INSERT INTO feedback (data)
    VALUES (JSON_OBJECT(
      'ratings', JSON_ARRAY(${ratings.join(',')}),
      'feedback', ?
    ))
  `;
  db.query(query, [feedback], (err) => {
    if (err) {
      console.error('Error inserting feedback:', err);
      res.status(500).send('Error saving feedback');
      return;
    }
    res.status(200).send('Feedback submitted successfully');
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
