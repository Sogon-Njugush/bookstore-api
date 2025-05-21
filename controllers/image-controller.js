import image from "../models/image.js";
import { uploadToCloudinary } from "../helpers/cloudinaryHelper.js";

const uploadImage = async (req, res) => {
  try {
    //check  if file is missing in return object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image!",
      });
    }
    //upload image to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);
    //save image to database
    const newImage = await image.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    res.status(201).json({
      success: true,
      message: "Image uploaded successfully!",
      data: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image, please try again!",
    });
  }
};

export { uploadImage };
