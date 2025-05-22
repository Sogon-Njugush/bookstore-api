import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required!"],
    trim: true,
    maxLength: [100, "Book title cannot exceed 100 characters"],
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

export default mongoose.model("Books", BooksSchema);
