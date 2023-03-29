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

  MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }

  const db = client.db('guestbook');

  db.collection('entries').insertOne({
    name: name,
    message: message,
    timestamp: new Date()
  }, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    console.log('Saved entry to MongoDB:', result.ops[0]);
    res.redirect('/');
  });
});

  // TODO: save name and message to a database or file

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Guestbook app listening at http://localhost:${port}`);
});
