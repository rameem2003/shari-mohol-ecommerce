const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * OPTIONAL but recommended:
 * Ensure a user can leave only one review per product.
 */
// reviewSchema.index({ user: 1, product: 1 }, { unique: true });

/**
 * Static helper to (re)compute and update ratingAverage on the product.
 */
reviewSchema.statics.updateProductRatingAverage = async function (productId) {
  const Product = mongoose.model("product");

  const stats = await this.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        nRatings: { $sum: 1 },
      },
    },
  ]);

  const ratingAverage = stats.length ? stats[0].avgRating : 0;

  await Product.findByIdAndUpdate(productId, { ratingAverage }, { new: true });
};

/**
 * After a review is created -> recompute avg.
 */
reviewSchema.post("save", function () {
  // 'this' is the current document
  this.constructor.updateProductRatingAverage(this.product);
});

/**
 * For findOneAndUpdate / findOneAndDelete we don't have document middleware,
 * so we use query middleware and access the returned doc in 'post'.
 */
const recomputeAfterQuery = async function (doc) {
  if (doc && doc.product) {
    await doc.constructor.updateProductRatingAverage(doc.product);
  }
};

reviewSchema.post("findOneAndUpdate", recomputeAfterQuery);
reviewSchema.post("findOneAndDelete", recomputeAfterQuery);
reviewSchema.post("findOneAndRemove", recomputeAfterQuery);

/**
 * (Optional) If you ever call doc.remove(), handle that as well.
 */
reviewSchema.post("remove", function (doc) {
  if (doc && doc.product) {
    doc.constructor.updateProductRatingAverage(doc.product);
  }
});

module.exports = mongoose.model("review", reviewSchema);
