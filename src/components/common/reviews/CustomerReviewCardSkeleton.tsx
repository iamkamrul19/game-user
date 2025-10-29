"use client";

import React from "react";

const CustomerReviewCardSkeleton = () => {
  return (
    <div className="relative bg-[#232323] min-h-[320px] w-full rounded-[23px] p-7 lg:p-9 animate-pulse">
      {/* Top section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
        <div className="flex items-center gap-6">
          {/* Profile image skeleton */}
          <div className="size-[52px] rounded-full bg-white/20" />

          <div className="space-y-2">
            <div className="h-4 w-32 bg-white/20 rounded" />
            <div className="h-4 w-40 bg-white/20 rounded" />
          </div>
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-[5px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-4 bg-white/20 rounded" />
          ))}
        </div>
      </div>

      {/* Comment text skeleton */}
      <div className="mt-10 lg:mt-12 space-y-3">
        <div className="h-4 w-full bg-white/20 rounded" />
        <div className="h-4 w-3/4 bg-white/20 rounded" />
        <div className="h-4 w-2/4 bg-white/20 rounded" />
      </div>

      {/* Footer skeleton */}
      <div className="flex justify-between items-center mt-10 lg:mt-12">
        <div className="h-3 w-16 bg-white/20 rounded" />
        <div className="h-3 w-20 bg-white/20 rounded" />
      </div>
    </div>
  );
};

export default CustomerReviewCardSkeleton;
