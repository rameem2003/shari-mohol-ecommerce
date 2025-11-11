const { default: z } = require("zod");
const orderValidatorSchema = z.object({
  userId: z.string({ message: "User ID is required" }),
  address: z.string({ message: "Address is required" }),
  city: z.string({ message: "City is required" }),
  postCode: z.string({ message: "Post Code is required" }),
  state: z.string({ message: "State is required" }),
  phone: z.string({ message: "Phone is required" }),
  cartItems: z.array(
    z.object({
      product: z.string({ message: "Product ID is required" }),
      color: z.string().optional(),
      size: z.string().optional(),
      quantity: z.number({ message: "Quantity is required" }),
    })
  ),
  grandTotal: z.number({ message: "Grand Total is required" }),
  transactionID: z.string({ message: "Transaction ID is required" }),
  paymentMethod: z.enum(["COD", "online"], {
    message: "Payment Method is required",
  }),
});

const orderStatus = z.enum(
  ["pending", "processing", "shipped", "delivered", "cancelled"],
  {
    message: "Invalid order status",
  }
);

module.exports = { orderValidatorSchema, orderStatus };
