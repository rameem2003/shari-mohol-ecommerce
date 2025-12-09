import { z } from "zod";

export const checkoutSchema = z.object({
  address: z
    .string()
    .trim()
    .min(2, "Address must be at least 2 char long")
    .max(255, "Address must not exceed 255 characters"),

  city: z
    .string()
    .trim()
    .min(3, "City must be at least 3 char long")
    .max(255, "City must not exceed 255 characters")
    .toLowerCase(),

  postCode: z
    .string()
    .min(4, "Postal Code must be at least 4 characters long")
    .max(8, "Postal Code must not exceed 8 characters")
    .toLowerCase(),
  state: z
    .string()
    .min(4, "State Code must be at least 4 characters long")
    .max(12, "State Code must not exceed 12 characters")
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .min(11, "Phone must be at least 11 char long")
    .max(11, "Phone must be at most 11 char long"),

  paymentMethod: z.enum(["COD", "online"], "Payment method is required"),
});

// z.infer automatically creates a TypeScript type from your Zod schema.
export type CheckoutData = z.infer<typeof checkoutSchema>;
