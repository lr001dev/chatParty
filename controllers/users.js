const express = require(`express`)
const router = express.Router()
const User = require(`../models/users.js`)
const bcrypt = require(`bcrypt`)

router.get(`/`, (req,res) => {
  res.render(`users/new.ejs`)
})

router.post(`/`, (req,res) => {
  console.log(req.body)
  res.redirect(`/`)
})

module.exports = router
