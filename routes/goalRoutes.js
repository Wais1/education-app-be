const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

// Get protect middleware function to protect routes
const {protect} = require('../middleware/authMiddleware')

// Define routes, expected param, functions to handle behavior in goalController
// Protect is added in first param to protect the route for authenticated users.
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


module.exports = router