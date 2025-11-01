"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination } from "swiper/modules";

import PriceSection from "@/components/common/PriceSection";
import SectionTitle from "@/components/common/SectionTitle";
import SwipperButtonCom from "@/components/common/swiper/SwipperButtonCom";
import { IPreOrders } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  preOrders: IPreOrders;
  className?: string;
}

const PreOrders = ({ preOrders, className }: Props) => {
  const dataList = preOrders?.games;
  const router = useRouter();
  return (
    <section className={`section ${className}`}>
      <div className="main-container">
        <div>
          <SectionTitle showIcon={false} title="Pre-orders" />
          <p className="mt-[22px] text-white/80 text-[14px] leading-[23px] font-inter max-w-[400px]">
            {`Pre-order now to secure your item before it's released and enjoy
            exclusive benefits or discounts!`}
          </p>
        </div>
        <div className="mt-[50px]">
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
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {dataList?.map((item) => (
              <SwiperSlide key={item?._id}>
                <div
                  className="min-h-[550px] cursor-pointer"
                  onClick={() => router.push(`/game-details/${item?.game_id}`)}
                >
                  <div className="h-[437px] rounded-[20px] overflow-hidden ">
                    {item?.image_url ? (
                      <Image
                        className="w-full h-full object-cover object-center rounded-[20px]"
                        src={item?.image_url}
                        height={437}
                        width={335}
                        alt="pre-order"
                      />
                    ) : null}
                  </div>
                  <h1 className="text-[18px] font-semibold text-white leading-[18px] mt-7">
                    {item?.title}
                  </h1>
                  <div className="mt-[15px]">
                    <PriceSection
                      price={item?.price}
                      offerPrice={item?.offer_price}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SwipperButtonCom className="mt-[32px] lg:mt-[54px]" />
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PreOrders;
