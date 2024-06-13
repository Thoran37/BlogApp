// Create mini express
const exp = require('express')
const adminApp = exp.Router()

// To handle asynchronous errors
const expressAsyncHandler = require('express-async-handler')

// To encrypt and decrypt passwords
const bcryptjs = require('bcryptjs')

// To generate dynamic web tokens
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')

// Middleware to get the admin object
let adminObj, articleObj;
adminApp.use((req, res, next) => {
  adminObj = req.app.get('admins')
  articleObj = req.app.get('articles')
  authorObj = req.app.get('authors')
  userObj = req.app.get('users')
  next()
})

// Route to login
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
  const admin = req.body
  const dbadmin = await adminObj.findOne({ username: admin.username })
  if (dbadmin === null)
    res.send({ message: "Invalid username" })
  else {
    const status = await bcryptjs.compare(admin.password, dbadmin.password)
    if (status === false)
      res.send({ message: "Invalid password" })
    else {
      const signedToken = jwt.sign({ username: dbadmin.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
      res.send({ message: "Login successful", token: signedToken, admin: dbadmin })
    }
  }
}))

// Route to register
adminApp.post('/register', expressAsyncHandler(async (req, res) => {
  let body = req.body
  const dbAdmin = await adminObj.findOne({ username: body.username })
  if (dbAdmin !== null)
    res.send({ message: "Admin already exists" })
  else {
    const hash = await bcryptjs.hash(body.password, 7)
    body.password = hash
    await adminObj.insertOne(body)
    res.send({ message: "Admin registered" })
  }
}))

// Route to get all articles 
adminApp.get('/articles', verifyToken, expressAsyncHandler(async (req, res) => {
  const articlesList = await articleObj.find().toArray()
  res.send({ message: "Articles List", payload: articlesList })
}))

// Route to get all users
adminApp.get('/users', verifyToken, expressAsyncHandler(async (req, res) => {
  const usersList = await userObj.find().toArray()
  res.send({ message: "Users List", payload: usersList })
}))

// Route to get all authors
adminApp.get('/authors', verifyToken, expressAsyncHandler(async (req, res) => {
  const authorsList = await authorObj.find().toArray()
  res.send({ message: "Authors List", payload: authorsList })
}))


// Export adminApp
module.exports = adminApp