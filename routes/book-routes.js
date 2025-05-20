import express from "express";

import {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
} from "../contollers/book-controller.js";

//create express router
const router = express.Router();

//all the routes for the books

router.get("/get", getAllBooks);
//get single book
router.get("/get/:id", getSingleBook);
//add book
router.post("/add", addBook);
//update book
router.put("/update/:id", updateBook);
//delete book
router.delete("/delete/:id", deleteBook);

export default router;
