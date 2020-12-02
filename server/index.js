const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const keys = require('./keys')

//import routes

const ordersRoutes = require('./routes/orders')

//initial express
const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())


//initial routes
app.use('/', ordersRoutes)


async function start() {
  try {    
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(PORT)
    console.log(`server is running on ${PORT} port`)
  } catch(e) {
    console.error(e.message)
  }
}

start()