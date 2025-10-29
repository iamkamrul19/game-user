"use client";

import { IHeroSection2 } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  hero: IHeroSection2[];
}

const HeroL2 = ({ hero }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // bg-gradient-to-r from-[#FBA848] to-[#FB03AC]
  return (
    <>
      <section
        onMouseLeave={() => setActiveIndex(0)}
        className="w-[calc(100vw-15px)] h-[429px] overflow-hidden hidden lg:flex items-center"
      >
        {hero?.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === hero.length - 1;
          const isActive = index === activeIndex;

          let clipPath = `polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)`;
          if (isFirst) {
            clipPath = "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)";
          } else if (isLast) {
            clipPath = `polygon(${
              isActive ? "11%" : "20%"
            } 0, 100% 0, 100% 100%, 0% 100%)`;
          } else if (index === 1) {
            if (isActive) {
              clipPath = "polygon(11% 0%, 100% 0%, 90% 100%, 0% 100%)";
            }
          } else if (index === 2) {
            if (isActive) {
              clipPath = "polygon(11% 0%, 100% 0%, 90% 100%, 0% 100%)";
            }
          }

          const marginClass = isFirst ? "" : "-ml-[120px]";

          return (
            <div
              key={item.game_id}
              onMouseEnter={() => setActiveIndex(index)}
              className={`${marginClass} h-full ${
                isActive ? "flex-[2.5]" : "flex-[1]"
              } transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]`}
            >
              <Link
                href={`${item?.game_id}`}
                className="block w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  clipPath,
                }}
              >
                <Image
                  src={
                    activeIndex === index
                      ? item.image_desktop
                      : item.image_minimized
                  }
                  alt={item.game_id}
                  width={770}
                  height={430}
                  className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                />
              </Link>
            </div>
          );
        })}
      </section>
      <section className="block lg:hidden">
        <div className="">
          <Swiper loop={true} navigation={false} pagination={true} modules={[Navigation,Pagination]} className="h-[220px]">
            {hero?.map((item) => (
              <SwiperSlide key={item?.game_id} className="h-full">
                <Link href={item.game_id} className="h-[280px] w-full">
                <Image className="w-full h-full" src={item.image_mobile} height={300} width={350} alt="hero-image"/></Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default HeroL2;
