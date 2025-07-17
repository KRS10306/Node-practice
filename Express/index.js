const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("Workinggg")
})

app.get('/products', (req,res)=>{
    const Products = [
        {
            id: 1,
            items: "Product 1"
        },
        {
            id: 2,
            items: "Product 2"
        },
        {
            id: 3,
            items: "Product 3"
        }
    ]
    res.json(Products)
})

app.get('/products/:id',(req,res)=>{
    const Products = [
        {
            id: 1,
            items: "Product 1"
        },
        {
            id: 2,
            items: "Product 2"
        },
        {
            id: 3,
            items: "Product 3"
        }
    ]
    const getProduct = Products.find(p=>p.id == req.params.id)
    if(getProduct) res.json(getProduct)
    else res.status(404).send("Product not found")
})

app.listen(9000,()=>console.log("Running on localhost:9000"))