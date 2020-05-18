// Importing Required Files And Packages Here.
const jwt = require("jsonwebtoken");
const config = require("config");

// Defining Middleware Logic Here.
const auth = async (req, res, next) => {
  // Get Token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({
      msg: "No Token , authorization denied.",
    });
  }

  // Verify Token Here.
  try {
      const decoded =await jwt.verify(token, config.get("JWT_SECRET"));
      req.user=decoded.user;
      next();

  } catch (err) {
      
    console.log(err.message);
    // If Token is not valid then catch block will be executed .
    res.status(401).json({
      msg: "Token is not valid.",
    });
  }
};

module.exports = auth;
