const express = require("express");
const app = express();

const myFirstMiddleware = (req,res,next) =>{
    console.log(req)
    next()
}

// app.use(myFirstMiddleware)

app.get("/",myFirstMiddleware,(req,res)=>{
    res.send("Workingg")
})

app.get("/about",(req,res)=> res.send("dcgiwc"))

app.listen(9000)