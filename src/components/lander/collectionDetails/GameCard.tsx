import PriceSection from "@/components/common/PriceSection";
import { IGame } from "@/types";
import { calculateDiscount } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: IGame;
}

const GameCard = ({ item }: Props) => {
  return (
    <Link
      href={`/game-details/${item?.id}`}
      className="block min-h-[230px] relative"
    >
      <span className="absolute left-0 top-0 bg-[#00000099] backdrop-blur-[8px] py-2.5 px-3 min-w-[67px] rounded-tl-[6px] rounded-br-[6px] text-[#ADEE68] text-[10px] leading-3 font-lexend">
        {calculateDiscount(item?.price, item?.offer_price)}% OFF
      </span>
      <div className="w-full h-[164px] rounded-[10px] border-[1px] border-[#444444] overflow-hidden">
        <Image
          className="w-full h-full object-cover object-center"
          src={item?.images?.[0]}
          height={164}
          width={261}
          alt="collect"
        />
      </div>
      <h3 className="text-[15px] leading-[15px] font-semibold font-poppins text-[#D1D1D1] mt-6 line-clamp-2">
        {item?.title || ""}
      </h3>
      <PriceSection
        className="mt-3"
        price={item?.price}
        offerPrice={item?.offer_price}
      />
    </Link>
  );
};

export default GameCard;
