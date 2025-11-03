const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    advertisementLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);
