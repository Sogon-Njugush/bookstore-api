import express from "express";
import {
  createAuthor,
  createBook,
  getBookwithAuthor,
  createMagazine,
  getMagazinewithAuthor,
  getSingleBookwithAuthor,
} from "../controllers/newbook-controller.js";

//create express router
const router = express.Router();

//all the routes for the books
router.post("/author", createAuthor);
router.post("/book", createBook);
router.get("/get", getBookwithAuthor);
router.post("/magazine", createMagazine);
router.get("/magazine", getMagazinewithAuthor);
router.get("/get/:id", getSingleBookwithAuthor);

export default router;
