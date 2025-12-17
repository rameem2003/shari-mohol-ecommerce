import Link from "next/link";
import CartSidePanel from "./CartSidePanel";
import UserMenu from "./UserMenu";
import { User } from "@/types/User";
import { CircleUserRound } from "lucide-react";

const NavRightSideComponent = ({ data }: { data: User }) => {
  return (
    <div className=" w-full">
      <div className=" flex items-center justify-end gap-3">
        {data ? (
          <UserMenu />
        ) : (
          <div className=" hidden lg:block">
            <Link
              href="/login"
              className=" flex items-center justify-center gap-2 bg-white rounded-lg px-2 py-2"
            >
              <CircleUserRound />
              {/* <span className=" font-bold">Sign UP</span> */}
            </Link>
          </div>
        )}

        <div>
          <CartSidePanel />
        </div>
      </div>
    </div>
  );
};

export default NavRightSideComponent;
