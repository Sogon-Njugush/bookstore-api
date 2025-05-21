const isAdminUser = (req, res, next) => {
  if (req.userInfo.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "Access denied, Admin only!",
    });
  }
};

export default isAdminUser;
