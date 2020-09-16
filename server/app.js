const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const PORT = 5000
const { MONGOURI } = require('./constants')

require('./models/user')
require('./models/post')

// parse requests in application/json format to json data
app.use(bodyParser.json())

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})
// // another way to deal with cors
// const cors = require('cors')
// app.use(cors())

// routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
app.use(authRoute)
app.use(postRoute)

// database connection
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb!')
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting', err)
})

// start server and make it always listen on port
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
