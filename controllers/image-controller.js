import fs from "fs";
import Image from "../models/image.js";
import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";

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
    const images = await Image.find();

    if (images.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No images found!",
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

export { uploadImageController, fetchImagesController };
