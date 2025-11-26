const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Basic Customer Info
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?\d{7,15}$/, "Please enter a valid phone number"],
    },

    // Address Info
    address: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      country: {
        type: String,
        default: "Unknown",
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
        trim: true,
      },
    },

    // Products in the order
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book", // reference to Book model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price cannot be negative"],
        },
      },
    ],

    // Financial Info
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Price cannot be negative"],
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "cash_on_delivery"],
      default: "cash_on_delivery",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    // Order Progress
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    deliveryDate: {
      type: Date,
    },

    // Optional notes
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// Optional: auto-calculate total price before saving
orderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.totalPrice = this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);

