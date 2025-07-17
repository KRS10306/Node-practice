const express = require("express");
const path = require("path");

const app = express();

//set view engine as ejs
app.set("view engine", "ejs");

//set directory for the views
app.set("views", path.join(__dirname, "views"));

const Products = [
  {
    id: 1,
    items: "Product 1",
  },
  {
    id: 2,
    items: "Product 2",
  },
  {
    id: 3,
    items: "Product 3",
  },
];

app.get('/',(req,res)=>{
    res.render('index', {title: "Home", products: Products})
})

app.listen(9000)