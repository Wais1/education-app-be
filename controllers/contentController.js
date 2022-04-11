const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get Content
// @route   GET /api/content
// @access  Private
const getContent = asyncHandler(async (req, res) => {
    // Get goals using mongoose model. Has method 'find'
    // Find goals associated with logged in user's id. Works because goal has user id in schema
    // can access req.user.id because of the protect middleware, that gets user from token
    
    // const content = await Goal.find({ user: req.user.id })
    const rand = Math.floor(Math.random() * 10);
    const content = rand > 5? 'https://www.youtube.com/embed/askbjJx-BQg' : 'https://www.youtube.com/embed/EKvHQc3QEow'

    // Return goals
    res.status(200).json(content)
})

// @desc    Upload content
// @route   POST /api/goals
// @access  Private
const uploadContent =  asyncHandler(async (req, res) => {
    // Check if request has no body data, return 400 error.
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    // Create goal using request body. Uses user.id associated with each goal to fetch them
    // const goal = await Goal.create({
    //     text: req.body.text,
    //     user: req.user.id,
    // })

    res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id ) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    // So that a different user does not delete another user's goal
    if(goal.user.toString() !== req.user.id ) {
        res.status(401)
        throw new Error('User not authorized')
    }    

    // Delete goal
    await goal.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getContent,
    uploadContent,
    updateGoal,
    deleteGoal
}