const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://arttumikkanen:Pert5a_k0ira-söpö@mikkanen1.1lwkchr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

  //Define a Mongoose schema
  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
    },
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;

  //Creating a new user
  const newUser = new User({
    name: 'Johny boy',
    sport: 'hockey',
    league: 'pro',
  });
  
  newUser.save()
    .then((savedUser) => {
      console.log('User created:', savedUser);
    })
    .catch((error) => {
      console.error('Failed to create user:', error);
    });
  
    //Fetching users
    User.find()
  .then((users) => {
    console.log('Users:', users);
  })
  .catch((error) => {
    console.error('Failed to fetch users:', error);
  });
//Updating a user
User.findByIdAndUpdate(userId, { age: 30 }, { new: true })
  .then((updatedUser) => {
    console.log('User updated:', updatedUser);
  })
  .catch((error) => {
    console.error('Failed to update user:', error);
  });

//Deleting a user
User.findByIdAndDelete(userId)
  .then(() => {
    console.log('User deleted');
  })
  .catch((error) => {
    console.error('Failed to delete user:', error);
  });

  //Close the MongoDB connection
  mongoose.connection.close()
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Failed to disconnect from MongoDB', error);
  });
