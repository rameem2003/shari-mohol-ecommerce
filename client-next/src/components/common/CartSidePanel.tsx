import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidePanel;
