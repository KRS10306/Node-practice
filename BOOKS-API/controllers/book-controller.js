const Book = require('../models/book-model.js')

const getAllBooks = async(req,res) =>{
    try {
        const getAllBooks = await Book.find()
        if(getAllBooks) res.status(200).json(getAllBooks)
        else res.status(404).json({message: "No Books"})
    } catch (err) {
        console.error(err)
    }
}

const getRequiredBook = async(req,res) =>{
    try {
        const RequiredBook = await Book.findById(req.params.id)
        if (RequiredBook) {
            res.status(200).json({message: "Your required Books details", details: RequiredBook})
        } else {
            res.status(404).json({message:"Book not found"})
        }
    } catch (err) {
        console.error(err);        
    }
}

const addBook = async(req,res) =>{
    try {
        const newBookFormData = req.body
        const newlyCreatedBook = await Book(newBookFormData)
        await newlyCreatedBook.save()
        res.json(newlyCreatedBook)
    } catch (err) {
        console.error(err)
    }
}

// {
//     "title": "Random Will Delete",
//     "author": "wfeiycgweyf",
//     "year": 1940,
//     "createdAt": "2025-03-09T11:42:37.842Z"
// }

const updateBook = async(req,res) =>{
    try {
        const currentId = req.params.id
        const updatedBook = await Book.findByIdAndUpdate(currentId, {$set: req.body},{new: true})
        // console.log(currentId)
        if(updatedBook) res.status(200).json({message: "Book updated Successfully !", details: req.body})//"68792f6c50038e583401e294"
        else res.status(404).json({message: "No such book found"})
    } catch (err) {
        console.error(err);        
    }
}

const deleteBook = async(req,res) =>{
    try {
        const currentId = req.params.id
        const deletedBook = await Book.findByIdAndDelete(currentId)
        if(deletedBook) res.status(200).json({message:"Book deleted successfully details of the deleted book", detail: deletedBook})
        else res.status(404).json({message:"No Such book"})
    } catch (err) {
        console.error(err);        
    }
}

module.exports = {
    getAllBooks,
    getRequiredBook,
    updateBook,
    addBook,
    deleteBook
}

// git remote add origin https://github.com/KRS10306/Node-practice.git
// git branch -M main
// git push -u origin main