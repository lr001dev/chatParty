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

//Mogoose Setup
const mongoose = require(`mongoose`)

//Middleware Declaration for PUT & DELETE Routes
const methodOverride = require(`method-override`)

//Importing Our Controllers
const usersController = require(`./controllers/users.js`)

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

/////////////////////////////////
//// Paths To Controllers //////
///////////////////////////////

app.use(`/create-account`, usersController)

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
