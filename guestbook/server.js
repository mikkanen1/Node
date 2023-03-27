console.log("Hello world.")

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:3000/guestbook';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Guestbook</title>
      </head>
      <body>
        <h1>Guestbook</h1>
        <form method="post" action="/add">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"><br>
          <label for="message">Message:</label>
          <textarea id="message" name="message"></textarea><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// tallentaa tietoa ja tekee siitä luokse päästävän
const { connectToDb } = require('./db');

app.post('/add', async (req, res) => {
  const { name, message } = req.body;
  const db = await connectToDb();
  await db.collection('guestbook').insertOne({ name, message });
  res.redirect('/');
});

// In server.js
app.get('/guestbook'), async (req, res) => {
    const db = await connectToDb}