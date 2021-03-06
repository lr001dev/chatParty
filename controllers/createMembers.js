const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const Member = require(`../models/members.js`) //Require User Model
const bcrypt = require(`bcrypt`) //Require Hash & Salt Password Encryption

//New User Route Show Route
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  } else {
        res.render(`members/new.ejs`, {
          currentUser: req.session.currentUser
        })
    }
})

//Create New User
router.post(`/`, (req,res) => {
  //Setting Password Encryption
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  // console.log(req.body)
  Member.create(req.body, (err, createdMember) => {
    // console.log(`Create new member ${ createdMember }`)
    res.redirect(`/log-in`)
  })
})

//Export route to server.js
module.exports = router
