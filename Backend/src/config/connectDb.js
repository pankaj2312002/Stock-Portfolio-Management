const mongoose = require("mongoose");
// const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {
      
      
      connectTimeoutMS: 30000,  //  initial connection 
      socketTimeoutMS: 45000,   // maximum inactivity time for a database operation
      serverSelectionTimeoutMS: 20000,  //  search time for an available MongoDB server
    });
    console.log(`Server Running On ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;