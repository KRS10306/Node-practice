const express = require('express');
const { registerUser, getUsers, loginUser, changePassword} = require('../controller/user-controller');
const userCheck = require('../middleware/user-middleware')

const route = express.Router()

route.post('/',registerUser)
route.get('/get',getUsers)
route.post('/login', loginUser)
route.post('/change-pass', userCheck ,changePassword)

module.exports = route