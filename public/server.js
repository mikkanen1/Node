// In server.js
const { connectToDb } = require('./db');

app.post('/add', async (req, res) => {
  const { name, message } = req.body;
  const db = await connectToDb();
  await db.collection('guestbook').insertOne({ name, message });
  res.redirect('/');
});

// In server.js
app.get('/guestbook', async (req, res) => {
    const db = await connectToDb();
    const entries = await db.collection('guestbook').find().toArray();
  
    let html = `
      <html>
        <head>
          <title>Guestbook</title>
        </head>
        <body>
          <h1>Guestbook</h1>
          <ul>
    `;
  
    entries.forEach((entry) => {
      html += `<li><strong>${entry.name}:</strong> ${entry.message}</li>`;
    });
  
    html += `
          </ul>
        </body>
      </html>
    `;
  
    res.send(html);
  });
  