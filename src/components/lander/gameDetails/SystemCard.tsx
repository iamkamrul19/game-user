import { IRequirement } from "@/types";
import React from "react";

interface Props {
  title: string;
  requirement: IRequirement;
}

const SystemCard = ({ title, requirement }: Props) => {
  const data = requirement
    ? Object?.entries(requirement || {})?.map(([key, value]) => ({
        key,
        value,
      }))
    : [];
  return (
    <div className="flex-1 bg-[#232323] rounded-[16px] p-7 lg:p-9">
      <h4 className="text-[#ADEE68] text-[14px] leading-5 font-semibold font-inter">
        {title}
      </h4>
      <div className="flex flex-col gap-3 mt-10">
        {data?.map((item) => (
          <div key={item.key} className="flex">
            <p className="text-[14px] leading-5 text-white font-inter font-semibold min-w-[120px] lg:min-w-[140px] capitalize">
              {item?.key}
            </p>
            <p className="text-[13px] leading-5 font-inter text-white/80">
              {item?.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemCard;
