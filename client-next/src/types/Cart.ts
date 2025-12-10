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

export interface OrderItemType {
  _id: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  phone: string;
  transactionID: string;
  deliveryStatus: string;
  grandTotal: number;
  orderIsCancelled: boolean;
  paymentMethod: string;
  cartItems: [
    {
      _id: string;
      color?: string;
      size?: string;
      quantity: number;
      product: Product;
    }
  ];
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderType {
  data: OrderItemType[];
  message: string;
  success: boolean;
}
