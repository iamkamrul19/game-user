import React from "react";

const MonthlyOfferSkeleton = () => {
  return (
    <div className="group relative">
      {/* Image placeholder */}
      <div className="border-[1px] border-white/20 rounded-[10px] overflow-hidden relative">
        <div className="w-full h-[223px] bg-white/20 animate-pulse" />
      </div>

      {/* Title */}
      <div className="mt-6 h-[18px] w-1/4 bg-white/20 rounded animate-pulse" />

      <div className="mt-6 h-[18px] w-2/3 bg-white/20 rounded animate-pulse" />
      {/* Price section */}
      <div className="mt-3 flex items-center gap-2">
        <div className="h-[16px] w-16 bg-white/20 rounded animate-pulse" />
        <div className="h-[16px] w-12 bg-white/20 rounded animate-pulse" />
      </div>

      {/* Discount badge */}
      <span className="absolute left-0 top-0 rounded-tl-[9px] rounded-br-[9px] py-[7px] px-[14px]">
        <div className="h-[18px] w-[50px] bg-white/20 rounded animate-pulse" />
      </span>
    </div>
  );
};

export default MonthlyOfferSkeleton;
