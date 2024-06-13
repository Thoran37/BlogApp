// Create mini express
const exp = require('express')
const authorApp = exp.Router()

// To handle asynchronous errors
const expressAsyncHandler = require('express-async-handler')

// To encrypt and decrypt passwords
const bcryptjs = require('bcryptjs')

// To generate dynamic web tokens
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')

// Middleware to get the author,article objects
let authorObj, articleObj;
authorApp.use((req, res, next) => {
  authorObj = req.app.get('authors')
  articleObj = req.app.get('articles')
  next()
})

// Route to register
authorApp.post('/register', expressAsyncHandler(async (req, res) => {
  let body = req.body
  const dbauthor = await authorObj.findOne({ username: body.username })
  if (dbauthor !== null)
    res.send({ message: "Author already exists" })
  else {
    const hash = await bcryptjs.hash(body.password, 7)
    body.password = hash
    await authorObj.insertOne(body)
    res.send({ message: "Author registered" })
  }
}))

// Route to login
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
  const author = req.body
  const dbauthor = await authorObj.findOne({ username: author.username })
  if (dbauthor === null)
    res.send({ message: "Invalid username" })
  else {
    const status = await bcryptjs.compare(author.password, dbauthor.password)
    if (status === false)
      res.send({ message: "Invalid password" })
    else {
      const signedToken = jwt.sign({ username: dbauthor.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
      res.send({ message: "Login successful", token: signedToken, user: dbauthor })
    }
  }
}))

// Route to create articles
authorApp.post('/article', verifyToken, expressAsyncHandler(async (req, res) => {
  let article = req.body
  await articleObj.insertOne(article)
  res.send({ message: "New Article created" })
}))


// Route to modify articles
authorApp.put('/article', verifyToken, expressAsyncHandler(async (req, res) => {
  const article = req.body
  let res1 = await articleObj.updateOne({ articleId: article.articleId }, { $set: { ...article } })
  let newArticle = await articleObj.findOne({ articleId: article.articleId })
  res.send({ message: "Article modified", payload: newArticle })
}))

// Delete and restore article by id
authorApp.put('/article/:id', verifyToken, expressAsyncHandler(async (req, res) => {
  const deleteObj = req.body
  if (deleteObj.status === true) {
    let modArticle = await articleObj.findOneAndUpdate({ articleId: deleteObj.articleId }, { $set: { ...deleteObj, status: false } }, { returnDocument: "after" })
    res.send({ message: "Article deleted", payload: modArticle.status })
  }
  else {
    let modArticle = await articleObj.findOneAndUpdate({ articleId: deleteObj.articleId }, { $set: { ...deleteObj, status: true } }, { returnDocument: "after" })
    console.log(modArticle)
    res.send({ message: "Article restored", payload: modArticle.status })
  }
}))

// Get articles of author
authorApp.get('/articles/:username', verifyToken, expressAsyncHandler(async (req, res) => {
  const name = req.params.username
  const articlesList = await articleObj.find({ username: name }).toArray()
  res.send({ message: `Articles of ${name}`, payload: articlesList })
}))

// Export authorApp
module.exports = authorApp