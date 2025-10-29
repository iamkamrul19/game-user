import { IGame } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceSection from "./PriceSection";
import { calculateDiscount } from "@/utils";

interface Props {
  game: IGame;
  className?: string;
  discountClass?: string;
  priceColor?: string;
}

const GameCard = ({ game, discountClass, priceColor }: Props) => {
  return (
    <Link href={`/game-details/${game.id}`} className="group relative">
      <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative">
        <Image
          className="w-full h-[223px] object-cover object-center"
          src={game?.images?.[0]}
          height={350}
          width={223}
          alt="trending"
        />
      </div>
      <h4 className="text-[18px] font-semibold leading-[18px] text-white mt-6">
        {game?.title || ""}
      </h4>
      <PriceSection
        className="mt-3"
        price={game?.price}
        offerPrice={game?.offer_price}
        discountColor={priceColor}
      />
      <span
        className={`absolute left-0 top-0  rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px] text-white text-[12px] font-lexend font-medium leading-[18px] backdrop-blur-[10px] ${discountClass}`}
      >
        {calculateDiscount(game?.price, game?.offer_price)}% OFF
      </span>
    </Link>
  );
};

export default GameCard;
