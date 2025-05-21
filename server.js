import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./database/db.js";
//import routes
import bookRoutes from "./routes/book-routes.js";
import userRoutes from "./routes/auth-routes.js";
import homeRoutes from "./routes/home-route.js";
import adminRoutes from "./routes/admin-routes.js";
import imageRoutes from "./routes/image-routes.js";
//create express app
const app = express();
//port
const port = process.env.PORT || 3001;
//connect to database
connectDB();

//middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/image", imageRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
