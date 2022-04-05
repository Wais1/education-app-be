const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// Middleware to use body data in request. Uses body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Sets the API routes and logic ƒor goals and users
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Override the default Express error handler with our own
// Shows error stack if in dev, else do not show in production
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))