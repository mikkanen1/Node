// Luodaan serveri Mongodb:llä joka ylläpitää
const mongodb = require('mongodb');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:3000/guestbook';

const connectToDb = async () => {
  const client = await mongodb.MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
  return client.db();
};

module.exports = {
  connectToDb,
};
