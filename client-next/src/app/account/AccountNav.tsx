"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RectangleEllipsis, ShoppingBag, User } from "lucide-react";

const navigationItems = [
  { name: "My Profile", icon: User, href: "/account/profile" },
  {
    name: "Change Password",
    icon: RectangleEllipsis,
    href: "/account/change-password",
  },
  { name: "Orders", icon: ShoppingBag, href: "/account/orders" },
];

const AccountNav = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="">
      <ul className=" space-y-4 items-start flex flex-row lg:flex-col gap-4">
        {navigationItems.map((curNav) => {
          const Icon = curNav.icon;

          return (
            <Link
              key={curNav.name}
              href={curNav.href || "#"}
              className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-none lg:rounded-r-lg border-b-5 lg:border-b-0 lg:border-l-5 text-shari-mohol-primary border-shari-mohol-primary duration-300 hover:bg-shari-mohol-primary hover:text-white ${
                pathname === curNav.href
                  ? "text-white bg-shari-mohol-primary"
                  : ""
              }`}
            >
              <Icon />
              <span className=" hidden md:block">{curNav.name}</span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default AccountNav;
