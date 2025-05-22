import mongoose from "mongoose";

const MagazineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Magazine title is required!"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publishing year is required!"],
    min: [0, "Publishing year cannot be negative"],
    max: [new Date().getFullYear(), "Publishing year cannot be in the future"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

export default mongoose.model("Magazine", MagazineSchema);
