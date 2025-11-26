const Book = require('./book.model');

// POST a book
const postBook = async (req, res) => {
  try {
    const { title, description, category, trending, newPrice } = req.body;

    // Get uploaded filename
    const coverImage = req.file ? req.file.filename : null;

    const newBook = await Book.create({
      title,
      description,
      category,
      trending,
      newPrice,
      coverImage
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

// GET single book
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

// UPDATE book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};

module.exports = { 
  postBook, 
  getAllBooks, 
  getSingleBook, 
  updateBook, 
  deleteBook 
};
