const jwtUtils = require("../utils/jwtUtils");
const authService = require("../services/authService");

const redirectIfAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
      res.clearCookie('jwt');
      return next();
    }

    const user = authService.getUserById(decoded.userId);
    if (user) {
      return res.redirect("/notes");
    } else {
      res.clearCookie('jwt');
      return next();
    }
  } catch (err) {
    console.error('RedirectIfAuth error:', err.message);
    res.clearCookie('jwt');
    return next();
  }
};

module.exports = redirectIfAuth;