import Product from "../models/Product.js";

const getProductAnalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      {
        $group: {
          _id: null,
          tottalRevenue: { $sum: "$price" },
          count: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          maxPrice: { $max: "$price" },
          minPrice: { $min: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          count: 1,
          averagePrice: 1,
          maxPrice: 1,
          minPrice: 1,
          priceDifference: {
            $subtract: ["$maxPrice", "$minPrice"],
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany();
    res.status(200).json({
      success: true,
      message: "Products deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: {
            $gte: 100, // Filter products with price greater than or equal to 100
            //for less than or equal to use $lte instead
          },
        },
      },
      //group by category
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          averagePrice: { $avg: "$price" },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Product stats fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      message: "Sample products inserted successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error inserting sample products",
    });
  }
};

export {
  insertSampleProducts,
  getProductStats,
  deleteProducts,
  getProductAnalysis,
};
