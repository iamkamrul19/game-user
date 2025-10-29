import PriceSection from "@/components/common/PriceSection";
import TimerCard from "@/components/common/TimerCard";
import { useCountdownTimer } from "@/hooks/useCountdowTimer";
import { IMonthlyOfferGame } from "@/types";
import { calculateDiscount, formatToReadableDate, isToday } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  item: IMonthlyOfferGame;
}

const MonthlyOfferCard = ({ item }: Props) => {
  const today = isToday(item?.offer_date) || false;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  const { days, hours, minutes, seconds } = useCountdownTimer(
    todayStart,
    todayEnd
  );
  return item?.is_unlocked ? (
    <Link href={`/game-details/${item?.game_id}`} className="group relative">
      <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative">
        <Image
          className="w-full h-[223px] object-cover object-center"
          src={item?.image_url}
          height={350}
          width={223}
          alt="trending"
        />
      </div>
      <p className="text-[12px] leading-[18px] text-[#00DCFF] font-semibold font-inter mt-6">
        {formatToReadableDate(item?.offer_date || "")}
      </p>
      <h4 className="text-[18px] font-semibold leading-[18px] text-white mt-4 line-clamp-2">
        {item?.title || ""}
      </h4>
      <PriceSection
        className="mt-3"
        price={item?.regular_price}
        offerPrice={item?.price_increase}
        discountColor={"#ADEE68"}
      />
      <span
        className={`absolute left-0 top-0  rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px] text-white text-[12px] font-lexend font-medium leading-[18px] backdrop-blur-[10px]`}
      >
        {calculateDiscount(item?.regular_price, item?.price_increase)}% OFF
      </span>
    </Link>
  ) : (
    <div className="group relative">
      <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative">
        <Image
          className="w-full h-[223px] object-cover object-center"
          src={"/lock-offer-card.png"}
          height={350}
          width={223}
          alt="trending"
        />
      </div>
      <p className="text-[12px] text-gradient leading-[18px] font-semibold font-inter mt-6">
        {today ? "Offer will start" : "Offer revealed after"}
      </p>
      {item?.offer_date && today ? (
        <div className="flex items-center gap-1.5 mt-3">
          <TimerCard
            className="bg-white/20 backdrop-blur-[10px]"
            title="DAY"
            value={days}
          />
          <TimerCard
            className="bg-white/20 backdrop-blur-[10px]"
            title="HR"
            value={hours}
          />
          <TimerCard
            className="bg-white/20 backdrop-blur-[10px]"
            title="MIN"
            value={minutes}
          />
          <TimerCard
            className="bg-white/20 backdrop-blur-[10px]"
            title="SEC"
            value={seconds}
          />
        </div>
      ) : (
        <p className="text-[#D1D1D1] font-poppins font-semibold text-[15px] leading-[15px] mt-3">
          {formatToReadableDate(item?.offer_date)}
        </p>
      )}
    </div>
  );
};

export default MonthlyOfferCard;
