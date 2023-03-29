const { MongoClient } = require('mongodb');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/guestbook.html');
});

app.post('/add', (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  const fs = require('fs');
const dataPath = './data.json';

fs.readFile(dataPath, (err, data) => {
  if (err) throw err;
  const guestbookEntries = JSON.parse(data);
  const newEntry = { name: name, message: message };
  guestbookEntries.push(newEntry);
  fs.writeFile(dataPath, JSON.stringify(guestbookEntries), (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});


  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Guestbook app listening at http://localhost:${port}`);
});

const fs = require('fs');
const path = require('path');

// ...

app.post('/add', (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const filePath = path.join(__dirname, 'entries.txt');
  const entry = `${name}: ${message}\n`;

  fs.appendFile(filePath, entry, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving guestbook entry');
    } else {
      res.redirect('/');
    }
  });
});
