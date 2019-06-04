///////////////////////////////////////////////////
/// Server.js Defines Our Routes, Controllers ///
///          And Database Connections        ///
////////////////////////////////////////////////

//Enviromental Variables
require(`dotenv`).config()

//Express Setup
const express = require(`express`)
const app = express()

//We are creating sever instance manually for socketio integration
const http = require(`http`).createServer(app)

//Socket IO Setup
const io = require(`socket.io`)(http)

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
app.use(express.static(`public`))

/////////////////////////////////
//// Paths To Controllers //////
///////////////////////////////

app.use(`/create-account`, createMembersController)
app.use(`/log-in`, sessionsController)
app.use(`/members`, membersController)
app.use(`/party-rooms`, partyRoomsController)

////////////////////////
//// Index Route //////
///////////////////////

app.get(`/`, (req,res) => {
  res.send(`Hello World`)
})

////////////////////////////////
//// Listening To Server //////
//////////////////////////////

io.on(`connection`, (socket) => {
  console.log(`A user connected`)
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
  socket.on(`chat message`, (msg) => {
    console.log(`this message was sent: ${ msg }`)
  })
})

http.listen(port, () => {
  console.log(`I'm listening to port ${ port }`)
})
