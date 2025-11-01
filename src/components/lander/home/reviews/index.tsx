"use client";

import SectionTitle from "@/components/common/SectionTitle";
import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reviews = () => {
  return (
    <section className="section">
      <div className="flex flex-col items-center">
        <SectionTitle
          title="See What Your Next Game Is Like"
          showIcon={false}
        />
        <p className="mt-6 text-white/80 text-[14px] leading-[23px] font-inter max-w-[380px] text-center">
          See what players think! These reviews focus on the actual games
          bought, covering gameplay, story, and how well they run on a system.
        </p>
      </div>
      <div className="mt-[64px]">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          // centeredSlides={true}
          loop={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 10,
            modifier: 2.5,
            slideShadows: true,
          }}
          // className="!w-full relative bg-[#001B30]"
          spaceBetween={12}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: "auto",
            },
            640: {
              slidesPerView: "auto",
            },
            768: {
              slidesPerView: "auto",
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="relative "
        >
          <SwiperSlide className="overflow-hidden rounded-[20px]">
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden rounded-[20px]">
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide className="overflow-hidden rounded-[20px]">
            <ReviewCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
