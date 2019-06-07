const express = require(`express`) // Require Express
const router = express.Router() //Grab Router Method From Express
const Member = require(`../models/members.js`) //Require User Model

//Show All Members Authenticated Member Only
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    Member.find({}, (err, allmembers) => {
      res.render(`members/profiles.ejs`, {
        members: allmembers,
        currentUser: req.session.currentUser
      })
    })

  } else {
    res.redirect(`/log-in`)
  }
})

//Show Profile To Authenticated Member Only
router.get(`/:userName`, (req,res) => {
  if(req.session.currentUser) {
    if(req.params.userName === req.session.currentUser.userName) {
        Member.aggregate([{ $lookup:
          {
            from: "partyrooms",
            localField: "userName",
            foreignField: "creator",
            as: "rooms"
          }
        },
        { $match : { userName : req.params.userName } }], (err, foundMember) => {
        // console.log(`Found Member: ${ foundMember[0] }`)
        //Edit current session object with default avatar image
        if(foundMember[0].img == undefined) {
          req.session.currentUser.img = `img/default.svg`
        }
        res.render(`members/profile.ejs`, {
            currentUser: req.session.currentUser,
            foundUser: foundMember[0]
          })
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
      // console.log(req.session.currentUser._id)
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

  Member.findByIdAndUpdate(req.params.id, { $set: { firstName: req.body.firstName, bio: req.body.bio } }, { new: true},
    (err, updatedUser) => {
    // console.log(`Updated user: ${ updatedUser }`)
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  })
})

//Export route to server.js
module.exports = router
