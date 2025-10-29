"use client";

import ChevronIcon from "@/components/icons/ChevronIcon";
import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  showPagination?: boolean;
}

const SwipperButtonCom = ({ className, showPagination = true }: Props) => {
  const swiper = useSwiper();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (!swiper) return;

    const updateIndex = () => {
      setCurrentIndex(swiper.realIndex);
      setTotalSlides(swiper.slides.length);
    };

    updateIndex(); // Set initial index
    swiper.on("slideChange", updateIndex);

    return () => {
      swiper.off("slideChange", updateIndex);
    };
  }, [swiper]);

  return (
    <div className={`flex justify-between items-center gap-4 ${className}`}>
      <button
        onClick={() => swiper.slidePrev()}
        type="button"
        className="w-[33px] h-[36px] lg:h-[42px] py-[13px] bg-white/10 border border-white/15 flex justify-center items-center text-white cursor-pointer rounded-[10px]"
      >
        <ChevronIcon className="rotate-180 !size-[16px] lg:size-[20px]" />
      </button>

      {/* Custom Pagination Dots */}
      {showPagination ? (
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <span
              key={index}
              className={`w-[24px] lg:w-[32px] h-[4px] rounded-[50px] ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            ></span>
          ))}
        </div>
      ) : null}

      <button
        onClick={() => swiper.slideNext()}
        type="button"
        className="w-[33px] h-[36px] lg:h-[42px] px-[8px] py-[13px] bg-white/10 border border-white/15 flex justify-center items-center text-white cursor-pointer rounded-[10px]"
      >
        <ChevronIcon className="!size-[16px] lg:size-[20px]" />
      </button>
    </div>
  );
};

export default SwipperButtonCom;
