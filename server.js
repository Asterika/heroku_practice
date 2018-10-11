const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

//Port
//Allow use of Heroku's port on local port
const PORT = process.env.PORT || 3000

//Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:' + 'project2'

//Connect to mongoose
mongoose.connect(MONGODB_URI, {useNewUrlParser:true})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//open connection to mongo
db.on('open', () => {})

//middleware
//use public folder for static assets like css
app.use(express.static('public'))

//populate req.body with parsed info from forms, if no data, will return an empty object
app.use(express.urlencoded({extended:false}))

//use methodOverride
//allows us to use PUT and DELETE verbs
app.use(methodOverride('_method'))

//routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//listen
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
})
