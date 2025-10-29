import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PaymentCardSkeleton = () => {
  return (
    <label
      className="bg-[#232323] px-5 py-5 rounded-[20px] cursor-pointer flex items-center gap-3"
      aria-hidden="true"
    >
      {/* radio */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-5 h-5">
            <Skeleton className="w-5 h-5 rounded-full" />
          </div>

          {/* logo box */}
          <div className="w-[57px] h-[37px] rounded-[5px] overflow-hidden">
            <Skeleton className="w-[57px] h-[37px] rounded-[5px]" />
          </div>
        </div>

        {/* text area */}
        <div className="flex-1">
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>
    </label>
  );
};

export default PaymentCardSkeleton;
