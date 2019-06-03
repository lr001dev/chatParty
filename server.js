///////////////////////////////////////////////////
/// Server.js Defines Our Routes, Controllers ///
///          And Database Connections        ///
////////////////////////////////////////////////

//Enviromental Variables
require(`dotenv`).config()

//Express Setup
const express = require(`express`)
const app = express()

//Configuration
const port = process.env.PORT
const mongoURI = process.env.MONGO_URI
const sesssionSecret = process.env.SECRET

//Mogoose Setup
const mongoose = require(`mongoose`)

//Sessions Express Setup
const session = require(`express-session`)

//Middleware Declaration for PUT & DELETE Routes
const methodOverride = require(`method-override`)

//Importing Our Controllers
const createMembersController = require(`./controllers/createMembers.js`)
const sessionsController = require(`./controllers/sessions.js`)
const membersController = require(`./controllers/members.js`)
const partyRoomsController = require(`./controllers/partyRooms.js`)

//////////////////////////////////
//// Connecting To Database //////
/////////////////////////////////

mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once(`open`, () => {
  console.log(`You are connected to MongoDB, Hello!`)
})

///////////////////////
//// Middleware //////
/////////////////////

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride(`_method`))
app.use(session({
  secret: sesssionSecret,
  resave: false,
  saveUninitialized: false
}))

/////////////////////////////////
//// Paths To Controllers //////
///////////////////////////////

app.use(`/create-account`, createMembersController)
app.use(`/log-in`, sessionsController)
app.use(`/members`, membersController)
app.use(`/partyRoomsController`, membersController)

////////////////////////
//// Index Route //////
///////////////////////

app.get(`/`, (req,res) => {
  res.send(`Hello World`)
})

////////////////////////////////
//// Listening To Server //////
//////////////////////////////

app.listen(port, () => {
  console.log(`I'm listening to port ${ port }`)
})
