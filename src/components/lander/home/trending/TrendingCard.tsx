import PriceSection from "@/components/common/PriceSection";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import { ISectionGame } from "@/types";
import { calculateDiscount } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: ISectionGame;
}

const TrendingCard = ({ item }: Props) => {
  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  return (
    <Link href={`/game-details/${item.game_id}`} className="group relative ">
      <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative group-hover:scale-105 transition-all duration-300">
        <Image
          className="w-full h-[223px] object-cover object-center"
          src={item?.image_url?.[0]}
          height={350}
          width={223}
          alt="trending"
        />
        <button
          onClick={handleBookmark}
          type="button"
          className="cursor-pointer absolute bottom-3 right-3 border-[1px] border-[#FFFFFF38] backdrop-blur-[10px] p-[8px] rounded-[7px]"
        >
          <BookmarkIcon className="size-[16px] text-white" />
        </button>
      </div>
      <h4 className="text-[18px] font-semibold leading-[18px] text-white mt-6">
        {item?.title || ""}
      </h4>
      <PriceSection
        className="mt-3"
        price={item?.price}
        offerPrice={item?.offer_price}
        discountColor="#ADEE68"
      />
      <span className="absolute left-0 top-0 bg-[#00000099] rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px] text-white text-[12px] font-lexend font-medium leading-[18px] backdrop-blur-[10px] border-t-[1px] border-l-[1px] border-white/30">
        {calculateDiscount(item?.price, item?.offer_price)}% OFF
      </span>
    </Link>
  );
};

export default TrendingCard;
