const express = require('express');
const { registerUser, loginCheck, getUsers } = require('../controllers/auth-controller.js')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginCheck)
router.get('/get',getUsers)

module.exports = router
