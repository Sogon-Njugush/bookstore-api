import express from "express";
import {
  insertSampleProducts,
  getProductStats,
  deleteProducts,
  getProductAnalysis,
} from "../controllers/product-controller.js";

const router = express.Router();

//add product route
router.post("/add", insertSampleProducts);
//get product route
router.get("/stats", getProductStats);
//delete products
router.delete("/delete", deleteProducts);
//get product anaylsis
router.get("/analysis", getProductAnalysis);

export default router;
