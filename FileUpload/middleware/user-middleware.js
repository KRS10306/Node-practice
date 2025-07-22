const jwt = require("jsonwebtoken");

const userCheck = async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    // console.log(authToken)
    const token = authToken && authToken.split(" ")[1];
    if (!token) {
      return res.json({
        message: "no token found",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyToken) {
      return res.json({
        message: "Incorrect token",
      });
    }
    req.user = verifyToken
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = userCheck;
