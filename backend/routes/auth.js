const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // Import the necessary functions
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const { error } = require('ajv/dist/vocabularies/applicator/dependencies');

const JWT_SECRET ='Harshisagood$oy'

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], async (req, res) => {
  let sucess = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ sucess,errors: errors.array() });
  }
  try {

  
  let user = Users.findOne({ email: req.body.email });
  if (!user) {
    return req.status(400).json({ sucess,error: "sorry enter new user email" })
  }

  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password,salt);

  // Create a new  user
  user = await Users.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email
  })
  const data ={
   user:{
    id: user.id
   }
  }
  const authtoken = jwt.sign(data,JWT_SECRET);
  // console.log(jwtData);
  
  // res.json({ user });
  sucess = true;
  res.json({sucess,authtoken})
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error");

}
});

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at not be blank').exists(),
], async (req, res) => {
  let sucess = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;
  try {
   let user = await Users.findOne({email});
   if(!user){
    sucess = false;
    return res.status(400).json({error:"sorry not found"});
   }
   const passwordCompare = await bcrypt.compare(password,user.password);
   if(!passwordCompare){
    sucess = false;
    return res.status(400).json({   sucess , error:"please try with correct"});
   }

   const data={
    user:{
      id: user.id
     }
   }
   const authtoken = jwt.sign(data,JWT_SECRET);
   sucess = true;
   res.json({sucess,authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error");

}
})

router.post('/getuser',fetchuser, async (req, res) => {
  try{
    userid =req.user.id;
    const user = await Users.findById(userid).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error");

}
})


module.exports = router;
