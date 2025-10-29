"use client";

import { IReview } from "@/types";
import Image from "next/image";
import React from "react";
import RatingStar from "../RatingStar";
import { formatToReadableDate } from "@/utils";

interface Props {
  review: IReview;
}

const CustomerReviewCard = ({ review }: Props) => {
  return (
    <div className="relative bg-[#232323] min-h-[320px] w-full rounded-[23px] p-7 lg:p-9">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
        <div className="flex items-center gap-6">
          <div className="size-[52px] rounded-full overflow-hidden bg-white">
            {review?.user_image ? (
              <Image
                src={review?.user_image || ""}
                height={52}
                width={52}
                alt="review-image"
                className="w-full h-full object-cover object-center"
              />
            ) : null}
          </div>

          <div className="">
            <p className="text-[14px] leading-[21px] font-inter font-medium text-white">
              {review?.user_name || ""}
            </p>
            <p className="text-[14px] leading-[23px] font-inter">
              <span className="text-white/80">Product:</span>{" "}
              <span className="text-[#ADEE68] font-medium">
                {review?.game_name || ""}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[5px]">
          <RatingStar num={review?.rating || 0} />
        </div>
      </div>
      <p className="font-inter text-[16px] leading-[23px] text-white mt-10 lg:mt-12">
        {review?.comment || ""}
      </p>
      <div className="flex justify-between items-center text-white/80 mt-10 lg:mt-12 text-[12px] font-inter leading-[23px]">
        <span>{review?.user_status || ""}</span>
        <span>{formatToReadableDate(review?.createdAt || "")}</span>
      </div>
    </div>
  );
};

export default CustomerReviewCard;
