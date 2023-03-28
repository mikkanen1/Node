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

  // TODO: save name and message to a database or file

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Guestbook app listening at http://localhost:${port}`);
});
