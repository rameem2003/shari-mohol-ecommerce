import { Product } from "./product";

export interface CartType {
  data: CartItemType[];
  grandTotal: number;
  message: string;
  success: boolean;
}

export interface CartItemType {
  _id: string;
  userId: string;
  quantity: number;
  item: Product;
}
