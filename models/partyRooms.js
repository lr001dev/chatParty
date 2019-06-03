///////////////////////////////////////////////
/// Create User Model & Schema for MongoDB ///
/////////////////////////////////////////////

const mongoose = require(`mongoose`)
const Schema = mongoose.Schema

const partyroomSchema = new Schema({
  roomName: { type: String, require: true },
  nameSpace: { type: String, require: true },
  firstName: { type: String, require: true },
  img: String,
  description: String
})

const PartyRoom = mongoose.model(`PartyRoom`, partyroomSchema)
module.exports = PartyRoom
