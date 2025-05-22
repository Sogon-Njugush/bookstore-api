import Author from "../models/Author.js";
import Books from "../models/newBook.js";
import Magazine from "../models/Magazine.js";

const createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    if (newAuthor) {
      res.status(201).json({
        success: true,
        message: "Author: Firstname Lastname successfully!",
        data: newAuthor,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await Books.create(req.body);
    if (newBook) {
      res.status(201).json({
        success: true,
        message: "Book created successfully!",
        data: newBook,
      });
    } else {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createMagazine = async (req, res) => {
  try {
    const newMagazine = await Magazine.create(req.body);
    if (newMagazine) {
      res.status(201).json({
        success: true,
        message: "Magazine created successfully!",
        data: newMagazine,
      });
    } else {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getBookwithAuthor = async (req, res) => {
  try {
    const result = await Books.find().populate("author");
    if (!result) {
      res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getMagazinewithAuthor = async (req, res) => {
  try {
    const result = await Magazine.find().populate("author");
    if (!result) {
      res.status(404).json({ success: false, message: "Magazine not found" });
    }
    res.status(200).json({
      success: true,
      message: "Magazine fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getSingleBookwithAuthor = async (req, res) => {
  try {
    const result = await Magazine.findById(req.params.id).populate("author");
    if (!result) {
      res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  createAuthor,
  createBook,
  getBookwithAuthor,
  createMagazine,
  getMagazinewithAuthor,
  getSingleBookwithAuthor,
};
