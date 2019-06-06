const express = require(`express`)
const router = express.Router()
const multer = require(`multer`)
const PartyRoom = require(`../models/partyRooms.js`)
const Member = require(`../models/members.js`)

const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, `./uploads/`)
  },
  filename: (req,file,cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
})

router.get(`/`, (req,res) => {
  if(req.session.currentUser) {

    console.log(`current user is: ` + req.session.currentUser.userName)
    console.log(`current user id is: ` + req.session.currentUser._id)
    
    res.render(`pictures/upload.ejs`, {
      currentUser: req.session.currentUser
    })
  } else {
    res.redirect(`/log-in`)
  }
})

router.post(`/upload-profile`, upload.single('images'), (req,res) => {
  console.log(req.file)
  console.log(`current user is: ` + req.session.currentUser)
  Member.findByIdAndUpdate(req.session.currentUser._id, { $set: { img: req.file.path } }, {new: true},
    (err, updatedUser) => {
    console.log(`Updated user: ${ updatedUser }`)
    res.redirect(`/members/${ req.session.currentUser.userName }`)
  })
})
module.exports = router
