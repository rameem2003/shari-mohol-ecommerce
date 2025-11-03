const { default: z } = require("zod");

const bannerUploadValidator = z.object({
  description: z
    .string({ message: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(255, {
      message: "Description must be no more than 255 characters long",
    }),
  advertisementLink: z
    .string({ message: "Advertisement link is required" })
    .url({ message: "Invalid URL format" }),
});

module.exports = bannerUploadValidator;
