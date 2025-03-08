const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  description: String,
  addLink: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.Schema("banner", bannerSchema);
