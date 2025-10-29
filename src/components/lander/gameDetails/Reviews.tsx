"use client";

import Button from "@/components/ui/Button";
import { IReview } from "@/types";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import SwipperButtonCom from "@/components/common/swiper/SwipperButtonCom";
import RatingStar from "@/components/common/RatingStar";

interface Props {
  total_reviews: number;
  average_rating: number;
  reviews: IReview[];
}

const Reviews = ({ reviews }: Props) => {
  return (
    <section className="section main-container">
      <div className="flex justify-between items-center">
        <div className="text-[16px] leading-[23px] font-inter">
          <p className="text-white/60">Ratings & Reviews</p>
          <h5 className="text-white font-bold">41 reviews</h5>
        </div>
        <Button
          variant="outline"
          className="bg-[#2D2D2D]"
          parentClassName="!w-fit"
        >
          Review this game
          <EditIcon className="size-[16px]" />
        </Button>
      </div>
      <div className="mt-[54px]">
        <Swiper
          className="!w-full relative"
          loop={true}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={32}
          // slidesPerView={3}
          breakpoints={{
            360: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.3,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2.7,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 35,
            },
          }}
        >
          {reviews?.map((item) => (
            <SwiperSlide key={item?.id}>
              <ReviewCard review={item} />
            </SwiperSlide>
          ))}
          <SwipperButtonCom
            className="mt-[32px] lg:mt-[54px]"
            showPagination={reviews?.length < 7 ? true : false}
          />
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
    <div className="bg-[#232323] rounded-[23px] px-[30px] py-[33px] min-h-[300px] w-full lg:max-w-[350px]">
      <div className="flex items-center gap-6">
        <div className="size-[54px] rounded-full bg-white">
          {review?.user_image ? (
            <Image
              src={review?.user_image}
              height={54}
              width={54}
              alt="review"
            />
          ) : null}
        </div>
        <div>
          <h5 className="text-white font-inter text-[14px] leading-[21px] font-medium">
            {review?.user_name}
          </h5>
          <p className="text-white/80 font-inter text-[14px] leading-[23px]">
            {review?.user_status}
          </p>
        </div>
      </div>
      <RatingStar num={review?.rating} className="mt-6" />
      <p className="mt-4 text-white text-[16px] leading-[23px] font-medium line-clamp-6">
        {review?.comment}
      </p>
    </div>
  );
};
