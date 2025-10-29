import PriceSection from "@/components/common/PriceSection";
import TimerCard from "@/components/common/TimerCard";
import CartIcon from "@/components/icons/CartIcon";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useCountdownTimer } from "@/hooks/useCountdowTimer";
import { ICurrentOffer } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import OfferCard from "./OfferCard";

interface Props {
  offer: ICurrentOffer;
}

const CurrentOffer = ({ offer }: Props) => {
  const { games } = offer;
  const firstOffer = games?.[0] || {};
  const { days, hours, minutes, seconds } = useCountdownTimer(
    offer?.start_date,
    offer?.end_date
  );
  return (
    <section
      className="bg-no-repeat bg-cover bg-center section"
      style={{
        backgroundImage: "url('/current-offer-bg.png')",
      }}
    >
      <div className="main-container flex flex-col lg:flex-row gap-8">
        <Link
          href={`${firstOffer?.game_id}`}
          className="bg-[#C2C2C238] lg:min-w-[357px] pt-[18px] pb-[24px] px-[15px] rounded-[18px]"
        >
          <div className="w-full h-[184px]">
            {firstOffer?.image_url?.[0] && (
              <Image
                className="w-full h-full object-cover rounded-[10px] border-[1px] border-white/30"
                src={firstOffer?.image_url?.[0] || ""}
                height={184}
                width={328}
                alt="current-offer"
              />
            )}
          </div>
          <div className="mt-9">
            <Badge title={`-${firstOffer?.offer || 0}%`} />
            <p className="mt-3 text-white text-[18px] leading-[18px] font-semibold font-poppins">
              {firstOffer?.title || ""}
            </p>
            <div className="mt-3">
              <PriceSection
                price={firstOffer?.price}
                offerPrice={firstOffer?.offer_price}
                discountColor="#A5FF46"
              />
            </div>
            <div className="mt-10">
              <Button variant="outline" className="bg-[#01000E]">
                <CartIcon />
                Add to cart
              </Button>
            </div>
          </div>
        </Link>
        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h3 className="text-[24px] font-bold leading-[24px] font-poppins text-white">
                More currently trending offers
              </h3>
              <p className="mt-1 text-[14px] leading-[21px] font-lexend text-white/70">
                More currently trending offers
              </p>
            </div>
            {offer?.show_offer && (
              <div className="flex gap-1.5">
                <TimerCard
                  title="day"
                  value={days}
                  className="!bg-[#FFFFFF38]"
                />
                <TimerCard
                  title="hr"
                  value={hours}
                  className="!bg-[#FFFFFF38]"
                />
                <TimerCard
                  title="min"
                  value={minutes}
                  className="!bg-[#FFFFFF38]"
                />
                <TimerCard
                  title="sec"
                  value={seconds}
                  className="!bg-[#FFFFFF38]"
                />
              </div>
            )}
          </div>
          <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 gap-5">
            {offer?.games?.slice(1, 5)?.map((item, index) => (
              <OfferCard item={item} key={item?.game_id + index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentOffer;
