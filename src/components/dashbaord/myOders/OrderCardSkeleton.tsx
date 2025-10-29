import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * OrderCardSkeleton
 * A shadcn-style skeleton placeholder that mirrors the layout of OrderCard.
 * Uses Skeleton components for shimmer effect.
 */
export default function OrderCardSkeleton() {
  return (
    <div className="bg-gradient-to-b from-[#5B5B5B]/40 to-[#393939]/30 rounded-[20px] px-7 py-5 min-h-[112px] flex justify-between items-center">
      <div className="flex items-center justify-between w-full">
        {/* left empty spacer like original */}
        <div></div>

        <div className="flex items-center gap-10 w-full">
          <div className="flex items-center flex-1">
            {/* Order id block */}
            <div className="pr-5 border-r border-r-white/20">
              <Skeleton className="h-3 w-10 rounded-md" />
              <Skeleton className="mt-2 h-4 w-20 rounded-md" />
            </div>

            {/* Time block */}
            <div className="px-5 border-r border-r-white/20">
              <Skeleton className="h-3 w-8 rounded-md" />
              <Skeleton className="mt-2 h-4 w-28 rounded-md" />
            </div>

            {/* Order status block */}
            <div className="px-5">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="mt-2 h-6 w-20 rounded-[20px]" />
            </div>
          </div>

          {/* Price column */}
          <div className="min-w-[160px] flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-12 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-12 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-12 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
