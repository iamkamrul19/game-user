"use client";

import { IReview } from "@/types";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/components/ui/Button";
import { EditIcon } from "lucide-react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import SwipperButtonCom from "../swiper/SwipperButtonCom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Progress from "./Progress";
import { useState } from "react";
import ReviewSubmit from "./ReviewSubmit";

interface Props {
  total_reviews: number;
  average_rating: number;
  reviews: IReview[];
  showAddButton: boolean;
  game_id: string;
}

const Reviews = ({
  reviews,
  average_rating,
  total_reviews,
  showAddButton,
  game_id,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="section main-container w-full">
      <div className="flex flex-col lg:flex-row gap-5 lg:justify-between lg:items-center">
        <div className="flex items-center gap-5">
          <Progress value={average_rating || 0} size={60} strokeWidth={5} />
          <div className="text-[16px] leading-[23px] font-inter">
            <p className="text-white/60">Ratings & Reviews</p>
            <h5 className="text-white font-bold">
              {total_reviews || 0} reviews
            </h5>
          </div>
        </div>
        {showAddButton ? (
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="bg-[#2D2D2D]"
            parentClassName="!w-fit"
          >
            Review this game
            <EditIcon className="size-[16px]" />
          </Button>
        ) : null}
      </div>
      <div className="mt-[54px]">
        <Swiper
          className="!w-full relative "
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
              spaceBetween: 28,
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
      <ReviewSubmit open={open} setOpen={setOpen} game_id={game_id} />
    </section>
  );
};

export default Reviews;
