require('dotenv').config()
const express = require('express');
const connectToDB = require('./DB/db.js');
const Authrouter = require('./router/user-router.js');
const Homerouter = require('./router/home-router.js')


connectToDB();

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());


app.use('/api/auth', Authrouter)
app.use('/api/home', Homerouter)


app.listen(PORT,()=>console.log(`Server running on localhost:${PORT}`))