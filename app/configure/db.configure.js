const mongoose = require('mongoose');

const connectdb = async() => {
  try {
    const uri = await mongoose.connect('mongodb://127.0.0.1:27017/database',{useNewUrlParser: true,});
    
    console.log(`MongoDB Connected: ${uri.connection.host}`);
    return ""
   } catch (error) {
    console.log("db connection error",error);
    process.exit(1);
    return ""
  }
  }

  module.exports = connectdb;