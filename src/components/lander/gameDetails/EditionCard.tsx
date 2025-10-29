import Bookmark from "@/components/common/Bookmark";
import PriceSection from "@/components/common/PriceSection";
import Button from "@/components/ui/Button";
import { IGame } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  item: IGame;
}

const EditionCard = ({ item }: Props) => {
  return (
    <div className="bg-[#232323] px-[15px] py-[12px] rounded-[20px] lg:max-w-[740px] flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8">
      <div className="w-full h-[192px] lg:w-[302px] lg:h-[192px] border-[1px] border-white rounded-[16px] overflow-hidden">
        <Image
          className="w-full h-full object-cover object-center"
          src={item?.images?.[0]}
          height={192}
          width={302}
          alt="edition"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-2 gap-8 lg:gap-0">
        <h1 className="text-[20px] font-bold font-poppins leading-5 text-white">
          {item?.title || ""}
        </h1>

        <div className="flex items-center justify-between">
          <PriceSection
            className="flex-row-reverse"
            offerPrice={item?.offer_price}
            price={item?.price}
          />
          <Bookmark />
          <Button
            variant="outline"
            className="bg-[#2D2D2D]"
            parentClassName="!w-fit"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditionCard;
