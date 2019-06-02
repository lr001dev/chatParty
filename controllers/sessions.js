const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const Member = require(`../models/members.js`) //Require User Model
const bcrypt = require(`bcrypt`) //Require Hash & Salt Password Encryption

//Log In Route For Non Authenticated Members
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  } else {
        res.render(`sessions/new.ejs`)
    }
})

//Authenticating Password Then Redirect
router.post(`/`, (req,res) => {
  Member.findOne({ userName: req.body.userName }, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser
      res.redirect(`/members/${ req.session.currentUser.userName }`)
    } else {
      res.send(`wrong password`)
    }
  })
})

//Delete Current Authenticated Session Log Out
router.delete(`/`, (req,res) => {
  req.session.destroy(() => {
    res.redirect('/log-in')
  })
})

//Export route to server.js
module.exports = router
