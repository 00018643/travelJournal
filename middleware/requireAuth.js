const jwtUtils = require("../utils/jwtUtils");
const authService = require("../services/authService");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
      res.clearCookie('jwt');
      return res.redirect("/login");
    }

    const user = authService.getUserById(decoded.userId);
    if (!user) {
      res.clearCookie('jwt'); 
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('RequireAuth error:', err.message);
    res.clearCookie('jwt'); 
    return res.redirect("/login");
  }
};

module.exports = requireAuth;