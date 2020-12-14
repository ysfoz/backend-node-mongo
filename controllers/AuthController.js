const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

exports.authRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // TODO1: Validate the fields
  // TODO2: check already registered
  // TODO3: crpyt password
  // TODO4: save the user to DB

  // validate the fields

  const validationErr = validationResult(req);
  if (validationErr?.errors?.length > 0) {
    return res.status(400).json({ errors: validationErr.array() });
  }

  const userData = await User.findOne({ email });
  if (userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "user already exist" }] });
  }

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    password: newPassword,
  });
  await user.save();
  res.send("Register Completed.");
};

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

// todo-1 field validation

  const validationErr = validationResult(req);
  if (validationErr?.errors?.length > 0) {
    return res.status(400).json({ errors: validationErr.array() });
  }
  // todo2 user exist check

  const userData = await User.findOne({ email });
  if (!userData) {
    return res
      .status(400)
      .json({ errors: [{ message: "user doesn't exist!!" }] });
  }

  //todo3 password compare

  const isPasswordMatch = await bcrypt.compare(password,userData.password)
  if(!isPasswordMatch){
    return res
    .status(400)
    .json({ errors: [{ message: "invalid credentials!!" }] });
  }

  //todo4 authentication -  JSON WEB TOKEN -JWT
jwt.sign({ userData },process.env.JWT_SECRET_KEY,{expiresIn:3600},(err,token) => { 

  if(err){
    return res
    .status(400)
    .json({ errors: [{ message: "unknown error!!" }] });
  }
  res.status(202).json({token});
})


  // TODO:field validation
  // TODO: user exist
  // TODO: password  compare
  // TODO: authentication -  JSON WEB TOKEN -JWT
  
};
