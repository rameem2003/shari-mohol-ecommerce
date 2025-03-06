const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: [true, "Email Already Exist"],
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    otp: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("auth", authSchema);
