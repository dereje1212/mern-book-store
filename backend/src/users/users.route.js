const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./users.model');
const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'fallback_secret';

// ✅ Admin Login Controller
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debugging logs
    console.log("Login attempt:", email);
    console.log("Password sent:", `"${password}"`);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const admin = await User.findOne({ email });
    console.log("Admin found:", admin);

    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    if (admin.role !== 'admin') return res.status(403).json({ message: 'Access denied: not an admin' });

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log("Password valid?", isPasswordValid);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send success response
    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('❌ Admin login failed:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// ✅ Routes
router.post('/admin', loginAdmin); // Public login route
router.get('/admin/profile', verifyAdminToken, (req, res) => {
  res.json({ message: 'Welcome Admin', admin: req.user });
});

module.exports = router;
