const fs = require('fs');

const express = require('express');
const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/guestbook.html');
});

app.post('/add', (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  // Load existing data from JSON file
  let data = [];
  try {
    const rawData = fs.readFileSync(dataPath);
    data = JSON.parse(rawData);
  } catch (error) {
    console.error(error);
  }

  // Add new guestbook entry to data
  data.push({ name, message });

  // Save data to JSON file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Guestbook app listening at http://localhost:${port}`);
});

const dataPath = __dirname + '/guestbook.json';
