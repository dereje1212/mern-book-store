const jwt = require('jsonwebtoken');

// ✅ Centralized secret with fallback
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'fallback_secret';

/**
 * Middleware: verifyAdminToken
 * -----------------------------------
 * Verifies JWT token and ensures the user has admin privileges.
 * Accepts token from:
 *   - Authorization header: "Bearer <token>"
 *   - or from req.cookies.token (if cookies are used)
 *
 * Usage:
 *   app.use('/admin', verifyAdminToken, adminRouter)
 */
function verifyAdminToken(req, res, next) {
  try {
    // 🧩 Extract token from Authorization header or cookies
    let token = null;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 🚫 No token found
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // 🔍 Verify token validity
    const payload = jwt.verify(token, JWT_SECRET);

    // 🔐 Check for admin role
    const isAdmin = payload?.role === 'admin' || payload?.isAdmin === true;
    if (!isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admin privileges required' });
    }

    // ✅ Attach user data to request for downstream handlers
    req.user = payload;
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({
      message: 'Invalid or expired token',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
}

module.exports = verifyAdminToken;
