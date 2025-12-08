import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import CartCard from "./CartCard";

const CartSidePanel = () => {
  return (
    <Sheet>
      <SheetTrigger className=" cursor-pointer">
        <div className=" relative">
          <Badge className=" bg-white absolute -top-2 -right-2" asChild>
            <span className=" font-bold text-shari-mohol-primary">1</span>
          </Badge>
          <ShoppingCart size={35} className=" text-5xl text-white" />
        </div>
      </SheetTrigger>
      <SheetContent className=" overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className=" text-shari-mohol-primary font-bold mb-4">
            Your Shopping Cart
          </SheetTitle>

          <CartCard />
        </SheetHeader>

        <SheetFooter className=" bg-shari-mohol-primary p-3">
          <h4 className=" text-4xl mb-2 text-white font-bold">Total: $100</h4>
          <button className=" w-full bg-white text-shari-mohol-primary font-bold py-3 rounded-md cursor-pointer">
            Proceed to Checkout
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidePanel;
