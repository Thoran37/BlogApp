// Create express app
const exp = require('express')
const app = exp()

// Environment variables for secrecy
require('dotenv').config()

// To parse body of request
app.use(exp.json())

// Importing database
const mongodb = require('mongodb').MongoClient

// Deploying react build to this server
const path = require('path')
app.use(exp.static(path.join(__dirname, '../client/build')))

// Database connection
mongodb.connect(process.env.DB_URL)
  .then(client => {
    const blogobj = client.db('blogdb')
    const users = blogobj.collection('userscollection')
    const authors = blogobj.collection('authorscollection')
    const admins = blogobj.collection('admincollection')
    const articles = blogobj.collection('articlescollection')
    app.set('users', users)
    app.set('authors', authors)
    app.set('admins', admins)
    app.set('articles', articles)
    console.log("DB connection established")
  })
  .catch(err => console.log("Error in DB", err))

// Importing Apis
const userApp = require('./APIs/user-api')
const authorApp = require('./APIs/author-api')
const adminApp = require('./APIs/admin-api')

// Sending requests to resp routes
app.use('/user-api', userApp)
app.use('/author-api', authorApp)
app.use('/admin-api', adminApp)

// Handling page refresh
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// Error handling
app.use((err, req, res, next) => {
  res.send({ message: "Error occured", payload: err.message })
})

// Port from .env
let port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening in on ${port}`))