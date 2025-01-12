const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/mydatabase';

const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};

module.exports = connectToMongo;
