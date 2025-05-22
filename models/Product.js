import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required!"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Product category is required!"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required!"],
    trim: true,
  },
  inStock: {
    type: Boolean,
    required: [true, "Product stock is required!"],
    trim: true,
  },
  tags: [String],
});

export default mongoose.model("Product", ProductSchema);
