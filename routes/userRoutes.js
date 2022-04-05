const express = require ('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
// Protected route has protect function in our middleware as a 2nd parameter.
// This checks the token and gets the user from the token
router.get('/me', protect, getMe)


module.exports = router