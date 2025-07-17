require('dotenv').config()
const express = require('express');
const connectToDb = require('./DataBase/db.js');
const Bookrouter = require('./routes/books-route.js')

const app = express()
const PORT = process.env.PORT || 3001

//connet to database
connectToDb();

//middleware -> express.json()
app.use(express.json())

app.use('/api/book', Bookrouter)


app.listen(PORT,()=>console.log(`Server running on port http://localhost:${PORT}/`))