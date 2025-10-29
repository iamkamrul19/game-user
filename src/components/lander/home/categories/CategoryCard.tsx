import { IGameCategory } from "@/types";
import Link from "next/link";
import React from "react";

interface Props {
  category: IGameCategory;
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Link
      href={""}
      className="h-[123px] bg-no-repeat bg-cover bg-center border-[2px] border-white/35 rounded-[17px] relative"
      style={{ backgroundImage: `url('${category?.image_url || ""}')` }}
    >
        <span className="absolute left-[16px] bottom-[11px] bg-black/75 rounded-[4px] px-[2px] py-[5px] text-white text-[18px] font-black font-poppins leading-[18px] uppercase">{category?.title}</span>
    </Link>
  );
};

export default CategoryCard;
