import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CartSidePanel from "./CartSidePanel";
import UserMenu from "./UserMenu";
import { User } from "@/types/User";
import { UserRound } from "lucide-react";

const NavRightSideComponent = ({ data }: { data: User }) => {
  return (
    <div className=" w-full">
      <div className=" flex items-center justify-end gap-3">
        {data ? (
          <UserMenu />
        ) : (
          <div className=" hidden lg:block">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/login"
                  className=" flex items-center justify-center gap-2 bg-white rounded-lg px-2 py-2"
                >
                  <UserRound className=" text-shari-mohol-primary font-bold size-8" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="">
                <p>Login</p>
              </TooltipContent>
            </Tooltip>
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
