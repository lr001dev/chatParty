///////////////////////////////////////////////
/// Create User Model & Schema for MongoDB ///
/////////////////////////////////////////////

const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const memberSchema = new Schema({
  userName: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  firstName: { type: String, require: true },
  img: String,
  bio: String,
  partyRooms: []
})

const Member = mongoose.model(`Member`, memberSchema)
module.exports = Member
