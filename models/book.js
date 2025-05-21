import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required!"],
    trim: true,
    maxLength: [100, "Book title cannot exceed 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Book author is required!"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publishing year is required!"],
    min: [0, "Publishing year cannot be negative"],
    max: [new Date().getFullYear(), "Publishing year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Book", BookSchema);
