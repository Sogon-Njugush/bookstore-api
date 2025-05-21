import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Image is required!"],
    },
    publicId: {
      type: String,
      required: [true, "Public id is required!"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Image", ImageSchema);
