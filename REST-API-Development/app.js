const express = require("express");

const app = express();

//Middleware
app.use(express.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.


//Data
const books = [
  {
    id: 1,
    title: "The Whispering Shadows",
  },
  {
    id: 2,
    title: "Echoes of the Forgotten",
  },
  {
    id: 3,
    title: "The Last Ember",
  },
  {
    id: 4,
    title: "Beneath Crimson Skies",
  },
  {
    id: 5,
    title: "Silent Storm",
  },
  {
    id: 6,
    title: "The Moonlit Path",
  },
  {
    id: 7,
    title: "Fragments of Hope",
  },
  {
    id: 8,
    title: "The Clockmaker’s Secret",
  },
  {
    id: 9,
    title: "Ashes and Ice",
  },
  {
    id: 10,
    title: "Threads of Destiny",
  },
];


//GET routes
app.get('/',(req,res)=>{
    res.json({
        message: "Welcome to Books-API"
    })
})

app.get('/get',(req,res)=>{
    res.json({
        message: "Book Section",
        books : books
    })
})

app.get('/get/:id',(req,res)=>{
    const singleBook = req.params.id
    const book = books.find(b=>b.id == singleBook)
    if(book) res.status(200).json(book)
    else res.status(404).json({status:404, message: "Book Not Found in our store"})
})

//Add a new Book ----POST
app.post("/add",(req,res)=>{
    // const newBook = {
    //     id: books.length + 1,
    //     title: `Book ${books.length + 1}`
    // }
    const newBook = req.body
    books.push(newBook)
    res.status(200).json({
        data: newBook,
        message: "Book Created successfully"
    })
})

//Update
app.put("/update/:id", (req,res)=>{
    const updateBook = books.find(b=>b.id == req.params.id)
    // console.log(req.params)
    if(updateBook){
        updateBook.title = req.body.title
        res.json({book: updateBook, message: "Book updates"})
    }
    else res.status(404).json({message: "Book Not Found", status: 404})
})

//Delete
app.delete('/delete/:id',(req,res)=>{
    const deleteBook = books.findIndex(b=>b.id == req.params.id) //Since splice takes input as index
    console.log(deleteBook)
    if (deleteBook) {
        const deleted = books.splice(deleteBook,1)
        // console.log(deleteBook[0] + "---------" + deleted[0])
        res.json({
            messsage: "Book deleted Successfully",
            title: deleted[0]
        })
    } else res.status(404).json({message:"book not found"})
})

//PORT
const PORT = 9000

app.listen(PORT)