const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email Already Exist"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVarify: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    photo: {
      type: String,
    },
    sessionToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("auth", authSchema);
