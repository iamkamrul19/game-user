import PriceSection from "@/components/common/PriceSection";
import { ISectionGame } from "@/types";
import { calculateDiscount } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: ISectionGame;
}

const BestSellerCard = ({ item }: Props) => {
  return (
    <Link href={`/game-details/${item.game_id}`} className="group relative">
      <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative">
        <Image
          className="w-full h-[223px] object-cover object-center"
          src={item?.image_url?.[0]}
          height={350}
          width={223}
          alt="trending"
        />
      </div>
      <h4 className="text-[18px] font-semibold leading-[18px] text-white mt-6">
        {item?.title || ""}
      </h4>
      <PriceSection
        className="mt-3"
        price={item?.price}
        offerPrice={item?.offer_price}
        discountColor="#74EBD5"
      />
      <span className="absolute left-0 top-0 bg-gradient-to-r from-[#E2003C] to-[#B70635] rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px] text-white text-[12px] font-lexend font-medium leading-[18px] backdrop-blur-[10px]">
        {calculateDiscount(item?.price, item?.offer_price)}% OFF
      </span>
    </Link>
  );
};

export default BestSellerCard;
