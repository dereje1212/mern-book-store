require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./users.model');


async function resetAdminPassword() {
  await mongoose.connect(process.env.DB_URL);
console.log("DB_URL:", process.env.DB_URL);

  const plainPassword = '123456';
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // proper hash

  const admin = await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    { password: hashedPassword },
    { new: true }
  );

  console.log('✅ Admin password reset:', admin);

  await mongoose.disconnect();
}

resetAdminPassword();
