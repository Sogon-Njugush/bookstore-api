import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import user from "../models/user.js";

const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
  const { username, email, role, userId } = req.userInfo;
  res.json({
    message: "Hello World",
    user: { _id: userId, username, email, role },
  });
});

export default router;
