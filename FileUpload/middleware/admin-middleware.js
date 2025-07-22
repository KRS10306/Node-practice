const adminCheck = async (req, res, next) => {
  // console.log(req.user.role)
  if (req.user.role === "admin") {
    req.user.message = "verified successfully & Welcome to the home page";
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "User not allowed - Admins only",
    });
  }
};

module.exports = adminCheck;
