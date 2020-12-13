

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
      console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    });
    console.log("succesfully connected to DB");
  } catch (err) {
    console.log("error connectin", err);
  }
};

module.exports =connectDB;