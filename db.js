const mongoose = require("mongoose")
function connect() {
    mongoose.connect(
      "mongodb+srv://ajay_sharma:Ajay@2000@cluster0.mslzs.mongodb.net/blogdb?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("Connected to db");
    });
  }
module.exports = connect
