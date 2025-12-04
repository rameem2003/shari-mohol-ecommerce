import { CircleUserRound } from "lucide-react";
import Link from "next/link";

import React from "react";
import CartSidePanel from "./CartSidePanel";

const NavRightSideComponent = () => {
  return (
    <div className=" w-full">
      <div className=" flex items-center justify-end gap-3">
        <div className=" hidden lg:block">
          <Link
            href="/signup"
            className=" flex items-center justify-center gap-2 bg-white rounded-lg px-2 xl:px-4 py-2"
          >
            <CircleUserRound />
            <span className=" font-bold">Sign UP</span>
          </Link>
        </div>

        <div>
          <CartSidePanel />
        </div>
      </div>
    </div>
  );
};

export default NavRightSideComponent;
