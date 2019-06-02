const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const User = require(`../models/users.js`) //Require User Model

//Show All Members Authenticated Member Only
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    res.render(`users/profiles.ejs`)
  } else {
    res.redirect(`/log-in`)
  }
})

//Show My Profile To Authenticated Member Only
router.get(`/:userName`, (req,res) => {
  if(req.session.currentUser) {
    if(req.params.userName === req.session.currentUser.userName) {
      res.render(`users/profile.ejs`, {
        currentUser: req.session.currentUser
      })
    } else {
          res.redirect(`/members`)
        }
   } else {
     res.redirect(`/log-in`)
   }
})

//Edit Show Route For Authenticated Users
router.get(`/:userName/edit`, (req,res) => {
  if(req.session.currentUser) {
    if(req.params.userName === req.session.currentUser.userName) {
      console.log(req.session.currentUser._id)
      res.render(`users/edit.ejs`, {
        currentUser: req.session.currentUser
      })
    } else {
      res.redirect(`/members`)
    }
  } else {
    res.redirect(`/log-in`)
  }
})

router.put(`/:id`, (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true},
    (err, updatedUser) => {
    console.log(`Updated user: ${ updatedUser }`)
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  })
})

module.exports = router
