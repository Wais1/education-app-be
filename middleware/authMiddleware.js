const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Get user from token to protect routes
const protect = asyncHandler(async(req, res, next) => {
    let token

    // Check authorization header, make sure its a bearer token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (text after 'Bearer ')
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token. Because ID was set earlier in token, now retrieve and find the user from the token
            // Sets req.user for further use in the route functions
            req.user = await User.findById(decoded.id).select('-password')

            // Call next middleware.
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }