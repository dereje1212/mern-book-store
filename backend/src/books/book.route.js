const express = require('express');
const router = express.Router();
const Book = require('./book.model');
const multer = require('multer');
const path = require('path');
const { postBook, getAllBooks, getSingleBook, updateBook, deleteBook} = require('./book.controller');
// const verifyAdminToken = require('../middleware/verifyAdminToken');




// Configure Multer for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images will be saved
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = require("../middleware/upload");

// ✅ Create a book with image upload
router.post('/create-book', upload.single('coverImage'), postBook);

//get all books
router.get('/', getAllBooks);

//get single book
router.get('/:id', getSingleBook);

//update a book
router.put('/edit/:id',updateBook);

//delete a book
router.delete('/delete/:id',deleteBook);



module.exports = router;