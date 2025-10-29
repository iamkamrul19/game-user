"use client";

import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/ui/Button";
import { ISectionGame } from "@/types";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import BestSellerCard from "./BestSellerCard";
import SwipperButtonCom from "@/components/common/swiper/SwipperButtonCom";

interface Props {
  games: ISectionGame[];
}
const BestSeller = ({ games }: Props) => {
  return (
    <section className="bg-[#001B30] section">
      <div className="main-container">
        <div className="flex justify-between items-center">
          <SectionTitle title="Bestsellers" showIcon={true} />
          <Link href={""}>
            <Button variant="outline" className="bg-[#2D2D2D]">
              View all
            </Button>
          </Link>
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
            {games?.map((item, index) => (
              <SwiperSlide key={item?.title + index}>
                <BestSellerCard item={item} />
              </SwiperSlide>
            ))}
            <SwipperButtonCom className="mt-[32px] lg:mt-[54px]" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
