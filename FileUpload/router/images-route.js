const express = require('express');
const userCheck = require('../middleware/user-middleware')
const adminCheck = require('../middleware/admin-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const uploadImage = require('../controller/image-controller')

const router = express.Router()

//upload images
router.post('/upload', userCheck , adminCheck, uploadMiddleware.single('image'), uploadImage)

module.exports = router