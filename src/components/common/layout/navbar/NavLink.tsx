import Link from "next/link";
import React from "react";
import { ILanderNav } from "./navbar.types";

const NavLink = ({ item }: { item: ILanderNav }) => {
  const { link, title } = item;
  return (
    <Link
      className="flex items-center text-white gap-2.5 text-sm font-semibold"
      href={link}
    >
      {item.icon &&
        (typeof item.icon === "function"
          ? React.createElement(item.icon)
          : item.icon)}
      {title}
    </Link>
  );
};

export default NavLink;
