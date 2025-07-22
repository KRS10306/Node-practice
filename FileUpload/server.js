require('dotenv').config()
const express = require('express');
const createConnection = require('./DB/db');
const homeRoute = require('./router/home-route')
const userRoute = require('./router/user-route')
const userCheck = require('./middleware/user-middleware')
const adminCheck = require('./middleware/admin-middleware')
const uploadImageRoutes = require('./router/images-route')


const cors = require('cors')


//user --------> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdlMDg4MWRmOWRiN2JhZTgwYTY3ZWMiLCJ1c2VybmFtZSI6IlJpc2hpdFNocml2YXN0d2EiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1MzA5MzA4NH0._Fcd3ym0fRJyntuDjh43WHIu8KO_LeVD41Zp4gjXoQg
//admin --------> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdlMDg1NGRmOWRiN2JhZTgwYTY3ZTkiLCJ1c2VybmFtZSI6IlJpc2hpdFNocmkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTMwOTQ1NjV9.ssmbjfUlQ9B6VGHF7divBjIb4P0Cyh7zu4EdfG6r-JE


const PORT = process.env.PORT || 9001

const app = express()

createConnection()


app.use(express.json())
app.use(cors())

app.use('/api',homeRoute)

app.use('/home', userCheck, adminCheck ,userRoute)

app.use('/image', uploadImageRoutes)

app.listen(PORT,()=>{
    console.log("Server running on localhost:9000 if not then localhost:9001")
})