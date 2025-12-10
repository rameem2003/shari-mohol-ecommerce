"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";

const navigationItems = [
  { name: "My Profile", icon: User, href: "/account/profile" },
  { name: "Orders", icon: ShoppingBag, href: "/account/orders" },
];

const AccountNav = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="">
      <ul className=" space-y-4 flex flex-col">
        {navigationItems.map((curNav) => {
          const Icon = curNav.icon;

          return (
            <Link
              key={curNav.name}
              href={curNav.href || "#"}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-r-lg border-l-5 text-shari-mohol-primary border-shari-mohol-primary duration-300 hover:bg-shari-mohol-primary hover:text-white ${
                pathname === curNav.href
                  ? "text-white bg-shari-mohol-primary"
                  : ""
              }`}
            >
              <Icon />
              {curNav.name}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default AccountNav;
