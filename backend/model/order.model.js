const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        color: {
          type: String,
          default: "",
        },
        size: {
          type: String,
          default: "",
        },
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
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipping", "delivered"],
      default: "pending",
    },
    orderIsCancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
