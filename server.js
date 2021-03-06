const express = require('express');
require('dotenv').config()
const connectDB = require('./models/connectDB')
const app = express()
const PORT = process.env.PORT || 5002
const router =require('./routes/router')
connectDB()

app.use(express.json())
app.use('/api',router)

// production heroku ya yukledigimizde yada yayina gectiginde bu islem yapiliyor.
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  

app.listen(PORT,() => {
    console.log(`listening port ${PORT}`)
});