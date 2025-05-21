import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is required!"],
    trim: true,
    unique: [true, "Username already exists!"],
  },
  email: {
    type: String,
    required: [true, "User email is required!"],
    trim: true,
    unique: [true, "Email already exists!"],
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, "User password is required!"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], //allowed values for this field
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema);

// const User = mongoose.model("User", UserSchema);
// export default User;
