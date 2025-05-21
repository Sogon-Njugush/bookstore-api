import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    //extract user data from request body
    const { username, email, password, role } = req.body;
    //check if user already exists in the database
    const checkExistingUser = await User.findOne({ email });
    if (checkExistingUser) {
      res.status(400).json({
        success: false,
        message: "User account already exists!",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user account
    const newlyCreatedUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User account created successfully!",
        data: newlyCreatedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to create user account!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists in the database
    const checkExistingUser = await User.findOne({ email });
    if (!checkExistingUser) {
      res.status(404).json({
        success: false,
        message: "Invalid account credentials!",
      });
    }
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkExistingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(401).json({
        success: false,
        message: "Invalid login credentials!",
      });
    }
    //create user token
    const accessToken = jwt.sign(
      {
        userId: checkExistingUser._id,
        username: checkExistingUser.username,
        email: checkExistingUser.email,
        role: checkExistingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//const logoutUser = async (req, res) => {};

//const refreshToken = async (req, res) => {};

export { registerUser, loginUser };
