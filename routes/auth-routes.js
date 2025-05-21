import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/auth-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

//all the routes for user authentication and authorization
//register
router.post("/register", registerUser);
//login
router.post("/login", loginUser);
//logout
//router.post("/logout", logoutUser);
//refresh token
//router.post("/refresh-token", refreshToken);
//update password
router.put("/update-password", authMiddleware, changePassword);

export default router;
