const express = require('express');
const app = express();
const connectDB = require('../MongoProject2/app/configure/db.configure');
const route = require("./app/routes/index.route");
const mongoose = require('mongoose');

app.use(express.json());

route.init(app);
const connectdb = async() => {
    try {
      const uri = await mongoose.connect('mongodb://127.0.0.1:27017/database',{useNewUrlParser: true,});
      
      console.log(`MongoDB Connected: ${uri.connection.host}`);
      return uri
     } catch (error) {
      console.log("db connection error",error);
      process.exit(1);
      return error
    }
    }
connectdb()
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port' + port);
});

