const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const User = require(`../models/users.js`) //Require User Model
const bcrypt = require(`bcrypt`) //Require Hash & Salt Password Encryption

//Log In Route
router.get(`/`, (req,res) => {
  res.render(`sessions/new.ejs`)
})

//Authenticating Password Then Redirect
router.post(`/`, (req,res) => {
  User.findone({ username: req.body.username }, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser
      res.redirect(`/`)
    } else {
      res.send(`wrong password`)
    }
  })
})

module.exports = router
