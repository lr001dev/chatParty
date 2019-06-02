require(`dotenv`).config()
const express = require(`express`)
const app = express()
const port = process.env.PORT
const mongoose = require(`mongoose`)
const methodOverride = require(`method-override`)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride(`_method`))

app.get(`/`, (req,res) => {
  res.send(`Hello World`)
})

app.listen(port, () => {
  console.log(`I'm listening to port ${ port }`)
})
