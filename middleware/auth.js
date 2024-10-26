const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);

    // Check if the user's role is admin
    if (decoded.role === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = auth;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFjY2Y1M2U4NDc2YTg2NjgyYTI4NWYiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyOTk0MTQxM30.cbSf4q3aqxgRVWuHFTxJU_fSKEdpChibvEzEX0eJlsg
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzFjY2Y1M2U4NDc2YTg2NjgyYTI4NWYiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyOTk0MTQxM30.cbSf4q3aqxgRVWuHFTxJU_fSKEdpChibvEzEX0eJlsg
