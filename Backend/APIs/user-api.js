// Create mini express
const exp = require('express')
const userApp = exp.Router()

// To handle asynchronous errors
const expressAsyncHandler = require('express-async-handler')

// To encrypt and decrypt passwords
const bcryptjs = require('bcryptjs')

// To generate dynamic web tokens
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')

// Middleware to get the user object
let userObj, articleObj;
userApp.use((req, res, next) => {
  articleObj = req.app.get('articles')
  userObj = req.app.get('users')
  next()
})

// Route to register
userApp.post('/register', expressAsyncHandler(async (req, res) => {
  let body = req.body
  const dbUser = await userObj.findOne({ username: body.username })
  if (dbUser !== null)
    res.send({ message: "User already exists" })
  else {
    const hash = await bcryptjs.hash(body.password, 7)
    body.password = hash
    await userObj.insertOne(body)
    res.send({ message: "User registered" })
  }
}))

// Route to login
userApp.post('/login', expressAsyncHandler(async (req, res) => {
  const user = req.body
  const dbUser = await userObj.findOne({ username: user.username })
  if (dbUser === null)
    res.send({ message: "Invalid username" })
  else {
    const status = await bcryptjs.compare(user.password, dbUser.password)
    if (status === false)
      res.send({ message: "Invalid password" })
    else {
      const signedToken = jwt.sign({ username: dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
      res.send({ message: "Login successful", token: signedToken, user: dbUser })
    }
  }
}))

// Route to get all articles 
userApp.get('/articles', verifyToken, expressAsyncHandler(async (req, res) => {
  const articlesList = await articleObj.find({ status: true }).toArray()
  res.send({ message: "Articles List", payload: articlesList })
}))

// Post comments on an article by articleId
userApp.put('/comment/:id', verifyToken, expressAsyncHandler(async (req, res) => {
  const comment = req.body
  const id = req.params.id
  let result = await articleObj.updateOne({ articleId: id }, { $addToSet: { comments: { username: comment.username, comment: comment.comment } } })
  let art = await articleObj.findOne({ articleId: id })
  res.send({ message: "Comment added", payload: art })
}))


// Export userApp
module.exports = userApp