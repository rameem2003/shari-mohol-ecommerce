const { default: z } = require("zod");

const productSegmentSchema = z.object({
  segment: z
    .enum(["", "all", "featured", "hot_sell"], {
      message: "Status must be 'all', 'featured', 'hot_sell'",
    })
    .default(""),
});

const newProductValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }),
  sellingPrice: z.coerce
    .number({ message: "Selling price required" })
    .nonnegative({ message: "Selling price cannot be negative" }),
  discountPrice: z.coerce
    .number()
    .nonnegative({ message: "Discount price cannot be negative" })
    .default(0),
  colors: z.string().optional(),
  sizes: z.string().optional(),
  stock: z.coerce
    .number()
    .nonnegative({ message: "Stock cannot be negative" })
    .default(0),
  category: z.string().min(1, { message: "Category ID is required" }),
  subCategory: z.string().min(1, { message: "Subcategory ID is required" }),
  featured: z.coerce.boolean().default(false),
  hotSell: z.coerce.boolean().default(false),
});

const productReviewValidationSchema = z.object({
  product: z.string().min(1, { message: "Product ID is required" }),
  rating: z.coerce.number({ message: "Rating is required" }),
  comment: z.string().min(1, { message: "Comment is required" }),
});
module.exports = {
  productSegmentSchema,
  newProductValidationSchema,
  productReviewValidationSchema,
};
