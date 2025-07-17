const express = require('express');
const {getAllBooks, getRequiredBook, deleteBook , updateBook ,addBook} = require('../controllers/book-controller.js')

const router = express.Router()
//OR --> express.Router()


router.get("/get", getAllBooks)
router.get("/get/:id", getRequiredBook)
router.post("/add", addBook)
router.put("/update/:id", updateBook)
router.delete("/delete/:id", deleteBook)

module.exports = router