const express = require(`express`)
const router = express.Router()
const PartyRoom = require(`../models/partyRooms.js`)
const Member = require(`../models/members.js`)

//Show All Party Rooms
router.get(`/`, (req,res) => {
  if(req.session.currentUser) {
    PartyRoom.find({}, (err, allPartyRooms) => {
      res.render(`partyRooms/index.ejs`, {
        partyRooms: allPartyRooms,
        currentUser: req.session.currentUser
      })
    })
  } else {
    res.redirect(`/log-in`)
  }
})

//New Party Room Show Route
router.get(`/create`, (req,res) => {
  if(req.session.currentUser) {
    res.render(`partyRooms/new.ejs`, {
      currentUser: req.session.currentUser
    })
  } else {
    res.redirect(`/log-in`)
  }
})

//Create New Party Rooms
router.post(`/`, (req,res) => {
  PartyRoom.create(req.body, (err, partyRoom) => {
    console.log(`Create new party room ${ partyRoom }`)
    Member.findByIdAndUpdate(req.session.currentUser._id, { $push: { partyRooms: partyRoom._id } }, {new: true},
    (err,updateMember) => {
      console.log(`Update member ${ updateMember }`)
    })
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  })
})

module.exports = router
