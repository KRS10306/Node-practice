const express = require('express');
const { registerUser, getUsers, loginUser} = require('../controller/user-controller');

const route = express.Router()

route.post('/',registerUser)
route.get('/get',getUsers)
route.post('/login', loginUser)

module.exports = route