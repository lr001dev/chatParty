const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const Member = require(`../models/members.js`) //Require User Model

//Show All Members Authenticated Member Only
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    res.render(`members/profiles.ejs`)
  } else {
    res.redirect(`/log-in`)
  }
})

//Show Profile To Authenticated Member Only
router.get(`/:userName`, (req,res) => {
  if(req.session.currentUser) {
    if(req.params.userName === req.session.currentUser.userName) {
      res.render(`members/profile.ejs`, {
        currentUser: req.session.currentUser
      })
    } else {
          res.redirect(`/members`)
        }
   } else {
     res.redirect(`/log-in`)
   }
})

//Show Edit Profile For Authenticated Members
router.get(`/:userName/edit`, (req,res) => {
  if(req.session.currentUser) {
    if(req.params.userName === req.session.currentUser.userName) {
      console.log(req.session.currentUser._id)
      res.render(`members/edit.ejs`, {
        currentUser: req.session.currentUser
      })
    } else {
      res.redirect(`/members`)
    }
  } else {
    res.redirect(`/log-in`)
  }
})

//Update Profile For Authenticated Members
router.put(`/:id`, (req,res) => {
  Member.findByIdAndUpdate(req.params.id, req.body, { new: true},
    (err, updatedUser) => {
    console.log(`Updated user: ${ updatedUser }`)
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  })
})

//Export route to server.js
module.exports = router
