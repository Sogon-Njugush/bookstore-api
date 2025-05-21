import fs from "fs";
import Image from "../models/image.js";
import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";
import cloudinary from "../config/cloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image!",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    fs.unlinkSync(req.file.path);

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully!",
      data: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading image, please try again!",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();

    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

    if (images.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No images found!",
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Images fetched successfully!",
      data: images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching images, please try again!",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const getCurrentImageId = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentImageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found!",
      });
    }

    //check if user is authorized to delete the image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image!",
      });
    }
    //delete image from cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);
    //delete image from database
    await Image.findByIdAndDelete(getCurrentImageId);
    return res.status(200).json({
      success: true,
      message: "Image deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting image, please try again!",
    });
  }
};

export { uploadImageController, fetchImagesController, deleteImageController };
