const jwt = require('jsonwebtoken');

const middlewareAuth = async (req, res, next) => {
    console.log("======= Hello Auth Middleware =====");
    console.log("Request Headers:", req.headers); // Log all headers
  
    const authHeader = req.headers.authorization;
    console.log("Authorization Header from MIDDLEWARE = " + authHeader);
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No token found or wrong format");
      return res.status(401).json({ error: "Unauthorized access" });
    }
  
    try {
      const token = authHeader.split(' ')[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded from MIDDLEWARE = ", decoded);
  
      req.userID = decoded.id; // Attach user ID to request
      console.log("User ID from MIDDLEWARE = ", req.userID);
      next();
    } catch (err) {
      console.error(`Error: ${err.message}`);
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid Token' });
      }
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = middlewareAuth;
  