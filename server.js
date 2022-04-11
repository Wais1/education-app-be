const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors') // To prevent CORS errors
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// Middleware to use body data in request. Uses body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Sets CORS responses
app.use(cors())

// Sets the API routes and logic ƒor content, goals and users
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/content', require('./routes/contentRoutes'))

// Override the default Express error handler with our own
// Shows error stack if in dev, else do not show in production
app.use(errorHandler)

app.listen(port, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`))