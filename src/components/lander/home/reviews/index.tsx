"use client";

import SectionTitle from "@/components/common/SectionTitle";
import React from "react";
import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reviews = () => {
  return (
    <section className="section">
      <div className="flex flex-col items-center">
        <SectionTitle title="Customer Reviews" showIcon={false} />
        <p className="mt-6 text-white/80 text-[14px] leading-[23px] font-inter max-w-[380px] text-center">
          GG Subscriptions offers cheaper PC, PlayStation, Xbox, and Switch
          games with 24/7 instant delivery!
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
          className="relative"
        >
          <SwiperSlide className="">
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide className="">
            <ReviewCard />
          </SwiperSlide>
          <SwiperSlide className="">
            <ReviewCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
