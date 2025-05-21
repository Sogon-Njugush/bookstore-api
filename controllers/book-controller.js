import Book from "../models/book.js";
//get all books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (allBooks.length > 0) {
      res.status(200).json({
        success: true,
        message: "Books fetched successfully!",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No books found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get single book
const getSingleBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookId);
    if (!bookDetailsById) {
      res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book fetched successfully!",
      data: bookDetailsById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//add book
const addBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newlyCreatedBook) {
      res.status(201).json({
        success: true,
        message: "Book created successfully!",
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//update book
const updateBook = async (req, res) => {
  try {
    const updatedFormData = req.body;
    const getCurrentBookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(
      getCurrentBookId,
      updatedFormData,
      {
        new: true,
      }
    );
    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//delete book
const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(getCurrentBookId);
    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllBooks, getSingleBook, addBook, updateBook, deleteBook };
