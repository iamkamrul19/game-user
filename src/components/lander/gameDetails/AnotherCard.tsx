import PriceSection from "@/components/common/PriceSection";
import { ICustomGame } from "@/types";
import React from "react";

interface Props {
  item: ICustomGame;
  isSelected: boolean;
  onClick: (item: ICustomGame) => void;
}

const AnotherCard = ({ isSelected, item, onClick }: Props) => {
  return (
    <div
      className={`rounded-[16px] max-w-[220px] min-h-[177px] p-[1px] relative overflow-hidden ${
        isSelected
          ? "bg-gradient-to-b from-[#ADEE68] to-[#863AB7] animate-glow-border"
          : "bg-[#363636]"
      }`}
    >
      <div
        className={`rounded-[16px] max-w-[220px] min-h-[177px] flex flex-col gap-10 ${
          isSelected
            ? "bg-gradient-to-b from-[#191993] to-[#6902A4]"
            : "bg-[#1E1E1E]"
        }`}
      >
        <p className="px-[17px] pt-[23px] text-white text-[13px] leading-[18px] font-medium font-inter line-clamp-2">
          {item?.title || ""}
        </p>

        <div
          className={`px-[17px]`}
          style={{
            paddingTop: item?.title?.length < 24 ? 16 : 0,
          }}
        >
          <PriceSection
            price={item?.price || 0}
            offerPrice={item?.offer_price || 0}
          />
        </div>
      </div>
      <button
        onClick={() => onClick(item)}
        type="button"
        className={`absolute bottom-0 left-0 right-0 py-2 cursor-pointer text-white text-[12px] leading-[23px] font-inter font-semibold ${
          isSelected ? "bg-white/20" : "bg-[#2F2F2F]"
        }`}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
      <div
        className={`absolute left-0 right-0 top-[45%] py-[0.5px] ${
          isSelected ? "bg-white/20" : "bg-white/10"
        }`}
      />
    </div>
  );
};

export default AnotherCard;
