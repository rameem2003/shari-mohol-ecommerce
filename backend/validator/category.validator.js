const { default: z } = require("zod");

const categorySegmentSchema = z.object({
  limit: z.coerce.number().int().positive().optional().default(10),
  offset: z.coerce.number().int().positive().optional().default(1),
});

const categoryUploadValidator = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name must be no more than 100 characters long" }),
  description: z
    .string({ message: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(255, {
      message: "Description must be no more than 255 characters long",
    }),
  subCategories: z
    .string({ message: "Subcategories are required" })
    .min(5, { message: "Subcategories must be at least 5 characters long" }),
});

module.exports = { categoryUploadValidator, categorySegmentSchema };
