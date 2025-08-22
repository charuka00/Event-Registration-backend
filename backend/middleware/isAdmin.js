// backend/middleware/isAdmin.js
export default function isAdmin(req, res, next) {
  // express-jwt puts the token payload on req.auth
  if (req?.auth?.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}
