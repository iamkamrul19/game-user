import PriceSection from "@/components/common/PriceSection";
import Badge from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const OfferCard = ({ item }: Props) => {
  return (
    <Link
      href={`${item?.game_id}`}
      className="min-h-[156px] bg-[#C2C2C238] rounded-[18px] p-[13px] flex items-center gap-[26px]"
    >
      <div className="w-[99px] h-[129px] rounded-[8px] overflow-hidden">
        {item?.image_url?.[0] ? (
          <Image
            className="w-full h-full object-cover object-center"
            src={item?.image_url?.[0]}
            height={129}
            width={99}
            alt="offer"
          />
        ) : null}
      </div>
      <div className="">
        <Badge title={`-${item?.offer}%`} />
        <h3 className="mt-[14px] text-[15px] leading-[15px] font-poppins font-semibold text-white">
          {item?.title}
        </h3>
        <div className="mt-[12px]">
          <PriceSection
            price={item?.price}
            offerPrice={item?.offer_price}
            discountColor="#A5FF46"
          />
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
