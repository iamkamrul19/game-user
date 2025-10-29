"use client";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import React from "react";

const PaymentItems = () => {
  const { checkout } = useAppSelector((state) => state);
  const { games } = checkout;
  return (
    <div className="main-container mt-9 flex flex-col lg:flex-row gap-6 overflow-x-auto custom-scrollbar">
      {games?.map((item) => (
        <div
          key={item.id}
          className="min-h-[231px] w-[241px] flex-shrink-0 pb-3"
        >
          <div className="border-[1px] border-white/30 h-[151px] w-full rounded-[5px] overflow-hidden">
            <Image
              src={item?.image_url}
              className="w-full h-full object-center object-cover"
              height={151}
              width={241}
              alt=""
            />
          </div>
          <div className="mt-8">
            <p className="text-[#EAEAEA] text-[10px] leading-[10px] font-inter">
              {item?.platform}
            </p>
            <h4 className="mt-2 text-white text-[14px] font-semibold font-poppins leading-[14px]">
              {item?.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentItems;
