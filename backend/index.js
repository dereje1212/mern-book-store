const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./src/users/users.model'); // adjust path if different

const app = express();

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require('./src/users/users.route');
const adminRoutes = require("./src/states/admin.state")

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use("/api/admin", adminRoutes)

const port = process.env.PORT || 3000;

// ✅ Function to seed default admin
async function createDefaultAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10); // default admin password

      const admin = new User({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();
      console.log("✅ Default admin user created successfully!");
    } else {
      console.log("ℹ️ Admin already exists, skipping creation.");
    }
  } catch (err) {
    console.error("❌ Error creating admin user:", err.message);
  }
}

// ✅ Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB');

    // Run admin creation after DB connects
    await createDefaultAdmin();
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
  }
}

main();

// Test route
app.get('/', (req, res) => {
  res.send('Hello World! MongoDB is connected 🚀');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
