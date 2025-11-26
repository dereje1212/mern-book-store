// src/users/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./users.model'); // Adjust path if needed

const createAdmin = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      return process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Create admin with both username and email
    const admin = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin user created successfully with email: admin@example.com');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
