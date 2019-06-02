const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const User = require(`../models/users.js`) //Require User Model
const bcrypt = require(`bcrypt`) //Require Hash & Salt Password Encryption

//New User Route Show Route
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  } else {
        res.render(`users/new.ejs`)
    }
})

//Create New User
router.post(`/`, (req,res) => {
  //Setting Password Encryption
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  // console.log(req.body)
  User.create(req.body, (err, createdUser) => {
    console.log(`Create new user ${ createdUser }`)
    res.redirect(`/log-in`)
  })
})

//Export route to server.js
module.exports = router
