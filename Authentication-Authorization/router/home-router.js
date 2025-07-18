const express = require('express');
const authMiddleware = require('../middleware/auth-middleware.js')
const router = express.Router()

router.get("/welcome",authMiddleware, (req,res)=>{
    const {userId, username, role} = req.user
    res.json({
        message: "Welcome to Home Page",
        user : {
            _id: userId,
            username,
            role
        }
    })
})

module.exports = router