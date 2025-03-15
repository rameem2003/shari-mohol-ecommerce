const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: String,
    phone: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        color: String,
        size: String,
        quantity: { type: Number, default: 1 },
      },
    ],

    grandTotal: Number,
    transactionID: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "online"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "COD"],
      default: "unpaid",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipping", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
