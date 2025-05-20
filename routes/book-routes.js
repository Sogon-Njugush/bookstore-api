import express from "express";

//create express router
const router = express.Router();

//all the routes for the books

router.get("/get");
router.get("/get/:id");
router.post("/add");
router.put("/update/:id");
router.delete("/delete/:id");
