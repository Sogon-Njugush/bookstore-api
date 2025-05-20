import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./database/db.js";
const app = express();

//port
const port = process.env.PORT || 3001;
//connect to database
connectDB();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
