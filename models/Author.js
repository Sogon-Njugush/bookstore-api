import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required!"],
    trim: true,
  },
  bio: {
    type: String,
    required: [true, "Author bio is required!"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Author", AuthorSchema);
