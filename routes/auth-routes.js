import express from "express";
import { registerUser, loginUser } from "../contollers/auth-controller.js";

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

export default router;
