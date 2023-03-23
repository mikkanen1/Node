// Luodaan serveri Mongodb:lle joka ylläpitää
const mongodb = require('mongodb');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/guestbook';

const connectToDb = async () => {
  const client = await mongodb.MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
  return client.db();
};

module.exports = {
  connectToDb,
};
