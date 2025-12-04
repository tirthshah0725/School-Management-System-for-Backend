import { Book } from "../modules/librarySchema.js";

// ------------------------ Create Book ------------------------
export const createBook = async (req, res, next) => {
  const { bookname, author } = req.body;

  try {
    if (!bookname || !author) {
      return res.status(400).json({
        success: false,
        message: "Please fill full form!",
      });
    }

    await Book.create({ bookname, author });

    res.status(200).json({
      success: true,
      message: "A new book is created!",
    });
  } catch (err) {
    next(err);
  }
};


// ------------------------ Get All Books ------------------------
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      books,
    });
  } catch (err) {
    next(err);
  }
};


// ------------------------ Pick Book ------------------------
export const pickBook = async (req, res, next) => {
  try {
    const { bookId, studentId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    if (book.status === "picked") {
      return res.status(400).json({
        success: false,
        message: "Book already picked!",
      });
    }

    book.status = "picked";
    book.pickedBy = studentId;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book picked successfully!",
    });
  } catch (err) {
    next(err);
  }
};


// ------------------------ Return Book ------------------------
export const returnBook = async (req, res, next) => {
  try {
    const { bookId, studentId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    if (book.status === "available") {
      return res.status(400).json({
        success: false,
        message: "Book is already available",
      });
    }

    if (book.pickedBy !== studentId) {
      return res.status(400).json({
        success: false,
        message: "You cannot return this book",
      });
    }

    book.status = "available";
    book.pickedBy = null;
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully!",
    });
  } catch (err) {
    next(err);
  }
};
