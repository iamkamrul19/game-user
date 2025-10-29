import PriceSection from "@/components/common/PriceSection";
import CartIcon from "@/components/icons/CartIcon";
import Button from "@/components/ui/Button";
import { ITwoGame } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  games: ITwoGame[];
}
const TwoGame = ({ games }: Props) => {
  return (
    <section className="section">
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 overflow-hidden min-h-[438px]">
        <div className="relative">
          <div className="absolute top-[62px] left-[100px] z-10">
            <Image
              src={games?.[0]?.logo}
              width={120}
              height={80}
              alt="tw-game"
            />
            <div className="bg-[#2D2D2D] w-[54px] h-[24px] border-[1px] border-[#FFFFFF] rounded-[50px] flex items-center justify-center mt-3 px-3 py-2">
              <span className="text-[12px] leading-[18px] font-semibold font-inter text-white">
                -{games?.[0]?.discount}%
              </span>
            </div>
            <h3 className="text-[20px] leading-6 font-bold font-poppins text-white mt-4 max-w-[250px]">
              {games?.[0]?.title || ""}
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <PriceSection
                price={games?.[0]?.price}
                offerPrice={games?.[0]?.offer_price}
              />
            </div>
            <div className="mt-8">
              <Button variant="outline" className="bg-[#2D2D2D]">
                <CartIcon />
                Add to cart
              </Button>
            </div>
          </div>
          <svg
            className="absolute top-0 left-0 bottom-0 w-[106%]"
            width="766"
            height="438"
            viewBox="0 0 766 438"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="imgPattern"
                patternUnits="userSpaceOnUse"
                width="766"
                height="438"
                patternContentUnits="objectBoundingBox"
              >
                <image
                  href={games?.[0]?.image_url}
                  width="1"
                  height="1"
                  preserveAspectRatio="none"
                />
              </pattern>

              <linearGradient
                id="paint0_linear"
                x1="766"
                y1="219"
                x2="0"
                y2="219"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity="0" />
                <stop offset="1" stopOpacity="0.76" />
              </linearGradient>
            </defs>

            <path
              d="M0 0H766L673.105 377.134C664.301 412.878 632.24 438 595.427 438H0V0Z"
              fill="url(#imgPattern)"
              stroke="currentColor"
              strokeWidth="0"
            />

            <path
              d="M0 0H766L673.105 377.134C664.301 412.878 632.24 438 595.427 438H0V0Z"
              fill="url(#paint0_linear)"
              stroke="none"
            />
          </svg>
        </div>

        <div className="relative">
          <div className="absolute top-[62px] left-[100px] z-10">
            <Image
              src={games?.[1]?.logo}
              width={120}
              height={80}
              alt="tw-game"
            />
            <div className="bg-[#2D2D2D] w-[54px] h-[24px] border-[1px] border-[#FFFFFF] rounded-[50px] flex items-center justify-center mt-3 px-3 py-2">
              <span className="text-[12px] leading-[18px] font-semibold font-inter text-white">
                -{games?.[1]?.discount}%
              </span>
            </div>
            <h3 className="text-[20px] leading-6 font-bold font-poppins text-white mt-4 max-w-[250px]">
              {games?.[1]?.title || ""}
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <PriceSection
                price={games?.[1]?.price}
                offerPrice={games?.[1]?.offer_price}
              />
            </div>
            <div className="mt-8">
              <Button variant="outline" className="bg-[#2D2D2D]">
                <CartIcon />
                Add to cart
              </Button>
            </div>
          </div>
          <svg
            className="absolute top-0 right-0 bottom-0 w-[106%]"
            width="766"
            height="438"
            viewBox="0 0 766 438"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="flippedClipPath">
                <path
                  d="M766 0H0L92.895 377.134C101.699 412.878 133.76 438 170.573 438H766V0Z"
                  transform="scale(1, -1) translate(0, -438)"
                />
              </clipPath>

              <linearGradient
                id="paint0_linear_mirrored"
                x1="0"
                y1="219"
                x2="766"
                y2="219"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity="0" />
                <stop offset="1" stopOpacity="0.76" />
              </linearGradient>
            </defs>

            {/* Image in full background, clipped to flipped shape */}
            <image
              href={games?.[1]?.image_url}
              width="766"
              height="438"
              preserveAspectRatio="none"
              clipPath="url(#flippedClipPath)"
            />

            {/* Gradient overlay, same flipped path */}
            <path
              d="M766 0H0L92.895 377.134C101.699 412.878 133.76 438 170.573 438H766V0Z"
              transform="scale(1, -1) translate(0, -438)"
              fill="url(#paint0_linear_mirrored)"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 relative lg:hidden">
        {games?.map((item) => (
          <Link
            className="h-[280px] relative"
            style={{ backgroundImage: `url('${item?.image_url}')` }}
            href={`/game-details/${item?.game_id}`}
            key={item?.game_id}
          >
            <div className="absolute left-10 top-5 z-10">
              <Image src={item?.logo} width={120} height={80} alt="tw-game" />
              <div className="bg-[#2D2D2D] w-[54px] h-[24px] border-[1px] border-[#FFFFFF] rounded-[50px] flex items-center justify-center mt-2 px-3 py-2">
                <span className="text-[12px] leading-[18px] font-semibold font-inter text-white">
                  -{item?.discount}%
                </span>
              </div>
              <h3 className="text-[20px] leading-6 font-bold font-poppins text-white mt-3 max-w-[250px]">
                {item?.title || ""}
              </h3>
              <div className="flex items-center gap-3 mt-3">
                <PriceSection
                  price={item?.price}
                  offerPrice={item?.offer_price}
                />
              </div>
              <div className="mt-6">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                  variant="outline"
                  className="bg-[#2D2D2D]"
                >
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TwoGame;

{
  /* {games.map((game, index) => (
          <div className={`py-[60px] pl-[100px]`} key={index}>
            <Image src={game?.logo} width={120} height={80} alt="tw-game" />
            <div className="bg-[#2D2D2D] w-[54px] h-[24px] border-[1px] border-[#FFFFFF] rounded-[50px] flex items-center justify-center mt-3 px-3 py-2">
              <span className="text-[12px] leading-[18px] font-semibold font-inter text-white">
                -{game?.discount}%
              </span>
            </div>
            <h3 className="text-[20px] leading-6 font-bold font-poppins text-white mt-3 max-w-[192px]">
              {game?.title || ""}
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-[20px] leading-[30px] font-semibold font-poppins line-through text-white/60">
                {game?.price}
              </p>
              <p className="text-[20px] leading-[30px] font-semibold font-poppins text-[#ADEE68]">
                {game?.offer_price}
              </p>
            </div>
          </div>
        ))} */
}
