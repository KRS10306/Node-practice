const jwt = require('jsonwebtoken');

const authMiddleware = async(req,res,next) => {
    // console.log("Welcome to auth middleware")
    const authToken = req.headers["authorization"]
    // console.log(authToken)
    const token = authToken && authToken.split(" ")[1]
    if (!token) {
        return res.json({
            message:"no token found"
        })
    }

    //decode the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("Decoded Token:", decodedToken);
        req.user = decodedToken; // Attach it here
        next();

        // console.log(req)
    } catch (err) {
        console.error(err);        
    }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTI4MjU3MDIsImV4cCI6MTc1MjgyNjYwMn0.Q-NhED8pBWQBCkyzhmM29Qu7B5WRXEj-cgWy3J9qtTs -->token

module.exports = authMiddleware