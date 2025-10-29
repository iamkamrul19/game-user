import { ICollection } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: ICollection;
}

const CollectionCard = ({ item }: Props) => {
  return (
    <Link
      href={`/collection-details/${item.id}`}
      className="block min-h-[230px]"
    >
      <div className="w-full h-[164px] rounded-[10px] border-[1px] border-[#444444] overflow-hidden">
        <Image
          className="w-full h-full object-cover object-center"
          src={item?.image_url}
          height={164}
          width={261}
          alt="collect"
        />
      </div>
      <h3 className="text-[15px] leading-[15px] font-semibold font-poppins text-[#D1D1D1] mt-6 line-clamp-2">
        {item?.title || ""}
      </h3>
      <p className="text-[#C3C3C3] text-[12px] leading-3 font-inter mt-1">{`${
        item?.game_ids?.length
      } ${item?.game_ids?.length > 1 ? "items" : "item"}`}</p>
    </Link>
  );
};

export default CollectionCard;
