const express = require('express');
// const User = require('../model/user-model');
const Home = require('../controller/homepage-controller')

const route = express.Router()

route.get('/user',Home)

module.exports = route