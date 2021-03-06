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
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `cparty`
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
const picturesController = require(`./controllers/pictures.js`)

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
app.use(`/uploads`, express.static(`uploads`))
/////////////////////////////////
//// Paths To Controllers //////
///////////////////////////////

app.use(`/create-account`, createMembersController)
app.use(`/log-in`, sessionsController)
app.use(`/members`, membersController)
app.use(`/party-rooms`, partyRoomsController)
app.use(`/pictures/`, picturesController)


////////////////////////
//// Index Route //////
///////////////////////

app.get(`/`, (req,res) => {
  // res.send(`Hello World`)
  if(req.session.currentUser) {
      res.redirect(`/members/${ req.session.currentUser.userName }`)
  } else {
    res.render(`index.ejs`, {
      currentUser: req.session.currentUser
    })
  }
})

////////////////////////////////
//// Listening To Server //////
//////////////////////////////

//Enabling socket io connection listener
io.on(`connection`, (socket) => {
  console.log(`A user connected`)
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
  //Listening for room connections sent by client.js
  socket.on(`room`, (room, userName, pic) => {
    socket.join(room)
    io.to(room).emit(`chat message`, `has joined this chat`, pic,userName)
    console.log(`${userName} joined: ${ room } with pic ${pic}`)
  })
  //Trasmiting message back to socket connections inside unique room
  socket.on(`chat message`, (msg,room,pic,userName) => {
    //Lets Check to see if server is receiving message from client.js
    console.log(`this message was sent: ${ msg }`)
    //Lets Check to see if server is receiving room name from client.js
    console.log(`the room is: ${ room }`)
    //Send message back to room that message was sent from
    io.to(room).emit(`chat message`, msg,pic,userName)
  })
})

http.listen(PORT, () => {
  console.log(`I'm listening to port ${ PORT }`)
})
