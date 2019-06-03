const express = require(`express`)
const router = express.Router()
const PartyRoom = require(`../models/partyRooms.js`)

//Show All Party Rooms
app.get(`/`, (req,res) => {
  res.render(`index.ejs`)
})
