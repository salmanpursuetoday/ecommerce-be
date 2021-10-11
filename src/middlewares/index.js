const jwt = require('jsonwebtoken');

//to check token
exports.authenticateUser = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(400).json({ message: "token not provode" });
  token = token.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_KEY);
  if (!user) return res.status(400).json({ message: "Invalid token" })
  req.user = user;
  next();
}

//to check Vendor
exports.isVendor = (req, res, next) => {
  if (req.user.role === "vendor") next();
  else return res.status(400).json({ message: "Access denied" });
}

//to check admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") next();
  else return res.status(400).json({ message: "Access denied" });
}

//to check admin
exports.isCustomer = (req, res, next) => {
  if (req.user.role === "customer") next();
  else return res.status(400).json({ message: "Access denied" });
}