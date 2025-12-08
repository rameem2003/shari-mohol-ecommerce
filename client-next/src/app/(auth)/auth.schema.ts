import { z } from "zod";

export const email = z.object({
  email: z
    .email("Please enter a valid email address ")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),
});

export type EmailValidatorType = z.infer<typeof email>;

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 char long")
    .max(255, "Name must not exceed 255 characters"),

  email: z
    .email("Please enter a valid email address ")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  phone: z
    .string()
    .trim()
    .min(11, "Phone must be at least 11 char long")
    .max(11, "Phone must be at most 11 char long"),
});

// z.infer automatically creates a TypeScript type from your Zod schema.
export type RegisterUserData = z.infer<typeof registerUserSchema>;

// Optional: Create a schema with password confirmation - in server we don't need confPass.
export const registerUserWithConfirmSchema = registerUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterUserWithConfirmData = z.infer<
  typeof registerUserWithConfirmSchema
>;

export const loginUserSchema = z.object({
  email: z
    .email("Please enter a valid email address ")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
