import express from "express";
import {
  uploadImageController as uploadImage,
  fetchImagesController,
} from "../controllers/image-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";
import uploadMiddleware from "../middleware/upload-middleware.js";

const router = express.Router();

//upload image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);

//get all images
router.get("/get", fetchImagesController);

export default router;
