const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors') // To prevent CORS errors
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const axios = require('axios')

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

// Nodeflux auth
//error happening during sending data
app.post('/nodefluxauth', (req, res) => {
    // Send auth req with axios here
    axios.post('https://backend.cloud.nodeflux.io/auth/signatures', {
        "access_key": "I3EQ8R022FGOKEKLEYS61T5YE",
        "secret_key": "QhfnDPj0E1C2llbhMszWF4iBt0kJpivQF_Fbk80rRmDz2KIQsuvxrL9S0ifNiCRq"
      }).then((response) => {
          console.log(response.data)
          res.send(response.data)
      }).catch((error) => {
        console.log(error)
        res.send(error)
    })
});

// Nodeflux facemask
app.post('/nodefluxfacemask', (req, res) => {
    console.log('hit!!!')
    const config = req.body.config
    const images = req.body.images

    // Send facemask req with axios here
    // Sends array of images (length 1)
    axios.post('https://api.cloud.nodeflux.io/v1/analytics/face-mask', {
        "images": images
    }, config).then((response) => {
        console.log(response.data)
        res.send(response.data)
    }).catch(error => {
        console.log(error)
        res.send(error)
    })
// console.log(req.body.config)
//     console.log(req.body.images)

});

// Nodeflux facemask polling
app.post('/nodefluxcheckjob', (req, res) => {
    const config = req.body.config
    const jobId = req.body.jobId
    
    console.log('checking job!! hit')
    axios.get(`https://api.cloud.nodeflux.io/v1/jobs/${jobId}`, config).then((response) => { 
        res.send(response.data) 
    })
})

// Override the default Express error handler with our own
// Shows error stack if in dev, else do not show in production
app.use(errorHandler)

app.listen(port, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`))