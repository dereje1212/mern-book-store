const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
    email: {        // ✅ Add this
      type: String,
      required: true,
      unique: true,
    },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Create model
const User = mongoose.model('User', userSchema);
module.exports = User;
