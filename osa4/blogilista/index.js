const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log('connected to database', mongoUrl)
    })
    .catch(err => {
        console.log(err)
    })


morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})