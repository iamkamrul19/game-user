"use client"

import StarIcon from "@/components/icons/StarIcon";
import Image from "next/image";
import React from "react";


const ReviewCard = () => {
  return (
    <div className="relative bg-[#232323] min-h-[320px] w-full rounded-[23px] p-7 lg:p-9">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
        <div className="flex items-center gap-6">
          <Image
            src={"/current-offer-bg.png"}
            height={52}
            width={52}
            alt="review-image"
            className="size-[52px] rounded-full"
          />
          <div className="">
            <p className="text-[14px] leading-[21px] font-inter font-medium text-white">
              Leslie Alexander
            </p>
            <p className="text-[14px] leading-[23px] font-inter">
              <span className="text-white/80">Product:</span>{" "}
              <span className="text-[#ADEE68] font-medium">
                Wolfenstein: the New Order
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[5px]">
          <StarIcon className="text-[#FBB24A]" />{" "}
          <StarIcon className="text-[#FBB24A]" />{" "}
          <StarIcon className="text-[#FBB24A]" />{" "}
          <StarIcon className="text-[#FBB24A]" />{" "}
          <StarIcon className="text-[#FBB24A]" />
        </div>
      </div>
      <p className="font-inter text-[16px] leading-[23px] text-white mt-10 lg:mt-12">{`I recently purchased a game through my GG subscription, and I couldn't be happier! The selection is impressive, offering a variety of genres that cater to all tastes. The download process was seamless, and the game runs smoothly on my system.`}</p>
      <div className="flex justify-between items-center text-white/80 mt-10 lg:mt-12 text-[12px] font-inter leading-[23px]">
        <span>Verified Customer</span>
        <span>14 hours ago</span>
      </div>
    </div>
  );
};

export default ReviewCard;
