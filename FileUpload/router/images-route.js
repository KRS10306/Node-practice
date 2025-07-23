const express = require('express');
const userCheck = require('../middleware/user-middleware')
const adminCheck = require('../middleware/admin-middleware')
const uploadMiddleware = require('../middleware/upload-middleware')
const {uploadImage, fetchImages} = require('../controller/image-controller')

const router = express.Router()

//upload images
router.post('/upload', userCheck , adminCheck, uploadMiddleware.single('image'), uploadImage)
router.get('/get', userCheck ,fetchImages)

module.exports = router