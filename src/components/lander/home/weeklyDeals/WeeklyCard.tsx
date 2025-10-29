import PriceSection from "@/components/common/PriceSection";
import TimerCard from "@/components/common/TimerCard";
import { useCountdownTimer } from "@/hooks/useCountdowTimer";
import { IWeeklyDeal } from "@/types";
import { calculateDiscount } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: IWeeklyDeal;
}

const WeeklyCard = ({ item }: Props) => {
  const { days, hours, minutes, seconds } = useCountdownTimer(
    new Date(),
    item?.offer_end
  );
  return (
    <Link href={`/game/${item.game_id}`} className="group relative">
      <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative">
        <Image
          className="w-full h-[223px] object-cover object-center"
          src={item?.image_url}
          height={350}
          width={223}
          alt="trending"
        />
      </div>
      <div className="flex items-center gap-3 mt-6">
        <TimerCard title="DAY" value={days} />
        <TimerCard title="HR" value={hours} />
        <TimerCard title="MIN" value={minutes} />
        <TimerCard title="SEC" value={seconds} />
      </div>

      <h4 className="text-[18px] font-semibold leading-[18px] text-white mt-6">
        {item?.title || ""}
      </h4>
      <PriceSection
        className="mt-3"
        price={item?.price}
        offerPrice={item?.offer_price}
        discountColor="#46AEFF"
      />
      <span className="absolute left-0 top-0 bg-gradient-to-r from-[#E2003C] to-[#B70635] rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px] text-white text-[12px] font-lexend font-medium leading-[18px] backdrop-blur-[10px]">
        {calculateDiscount(item?.price, item?.offer_price)}% OFF
      </span>
    </Link>
  );
};

export default WeeklyCard;
