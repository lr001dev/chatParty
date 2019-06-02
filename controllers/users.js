const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const User = require(`../models/users.js`) //Require User Model
const bcrypt = require(`bcrypt`) //Require Hash & Salt Password Encryption

//Create Route Show Route
router.get(`/`, (req,res) => {
  res.render(`users/new.ejs`)
})

//Create New User
router.post(`/`, (req,res) => {
  
  //Setting Password Encryption
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  console.log(req.body)
  res.redirect(`/`)
})

//Export route to server.js
module.exports = router
