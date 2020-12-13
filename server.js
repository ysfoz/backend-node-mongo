const express = require('express');
require('dotenv').config()
const connectDB = require('./models/connectDB')
const app = express()
const PORT = process.env.PORT || 5001
const router =require('./routes/router')
connectDB()

app.use(express.json())
app.use('/api',router)

app.listen(PORT,() => {
    console.log(`listening port ${PORT}`)
});