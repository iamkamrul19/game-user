"use client";

import SectionTitle from "@/components/common/SectionTitle";
import { IGame } from "@/types";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";
import SwipperButtonCom from "@/components/common/swiper/SwipperButtonCom";
import Link from "next/link";
import Image from "next/image";
import PriceSection from "@/components/common/PriceSection";
import { calculateDiscount } from "@/utils";

interface Props {
  games: IGame[];
}

const Similars = ({ games }: Props) => {
  return (
    <section className="main-container section">
      <SectionTitle title="Similar products" showIcon />
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
          {games?.map((item, idx) => (
            <SwiperSlide key={"" + item?.id + idx}>
              <Link
                href={`/game-details/${item.id}`}
                className="group relative"
              >
                <div className="border-[1px] border-white/30 rounded-[10px] overflow-hidden relative">
                  <Image
                    className="w-full h-[223px] object-cover object-center"
                    src={item?.images?.[0]}
                    height={350}
                    width={223}
                    alt="trending"
                  />
                </div>
                <h4 className="text-[18px] font-semibold leading-[18px] text-white mt-6">
                  {item?.title || ""}
                </h4>
                <PriceSection
                  className="mt-3"
                  price={item?.price}
                  offerPrice={item?.offer_price}
                  discountColor="#ADEE68"
                />
                <span className="absolute left-0 top-0 bg-gradient-to-r from-[#E2003C] to-[#B70635] rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px] text-white text-[12px] font-lexend font-medium leading-[18px] backdrop-blur-[10px]">
                  {calculateDiscount(item?.price, item?.offer_price)}% OFF
                </span>
              </Link>
            </SwiperSlide>
          ))}
          <SwipperButtonCom
            className="mt-[32px] lg:mt-[54px]"
            showPagination={games?.length < 7 ? true : false}
          />
        </Swiper>
      </div>
    </section>
  );
};

export default Similars;
