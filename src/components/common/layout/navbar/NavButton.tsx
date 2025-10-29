import Link from "next/link";
import React from "react";
import { ILanderNav } from "./navbar.types";

const NavButton = ({ item }: { item: ILanderNav }) => {
  return (
    <Link
      className="bg-gradient-to-r from-[#F8C431] to-[#FF6400] p-[1px] rounded-[50px] flex justify-center items-center"
      href={item?.link}
    >
      <span className="bg-[#000000] rounded-[50px] px-[7px] text-center flex justify-center items-center py-[1px]">
        <span className="bg-gradient-to-r from-[#F8C431] to-[#FF6400] bg-clip-text text-transparent text-[12px] leading-[18px] font-inter font-semibold text-center">
          {item.title}
        </span>
      </span>
    </Link>
  );
};

export default NavButton;
