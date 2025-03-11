const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 60 }, // TTL index for 1 minute
});

module.exports = mongoose.model("otp", otpSchema);
