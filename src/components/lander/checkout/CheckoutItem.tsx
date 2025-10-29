"use client";

import TrashIcon from "@/components/icons/TrashIcon";
import WishListIcon from "@/components/icons/WishListIcon";
import { setCheckoutGame } from "@/redux/slice/checkoutSlice";
import { ICheckoutGame } from "@/types";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  game: ICheckoutGame;
}

const CheckoutItem = ({ game }: Props) => {
  const dispatch = useDispatch();

  const handleQuantity = (type: "add" | "remove", item: ICheckoutGame) => {
    dispatch(
      setCheckoutGame({
        action: type,
        data: {
          ...item,
        },
      })
    );
  };
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
      <div className="flex flex-col lg:flex-row items-start gap-3">
        <div className="w-[110px] h-[70px] border-[1px] border-white/30 rounded-[5px] overflow-hidden">
          {game?.image_url ? (
            <Image
              className="w-full h-full object-cover object-center"
              src={game?.image_url || ""}
              height={70}
              width={110}
              alt="image-cart"
            />
          ) : null}
        </div>
        <div>
          <p className="text-[#787878] text-[12px] leading-[12px] font-inter">
            {game?.platform}
          </p>
          <h4 className="mt-[7px] text-white text-[14px] leading-[14px] font-poppins font-semibold">
            {game?.title || ""}
          </h4>
          {game?.fields ? (
            <div className="flex items-center gap-1 mt-1.5">
              {game?.fields?.map((field, index) => (
                <p
                  key={field.field}
                  className="text-[#B8B8B8] text-[12px] leading-[12px] font-inter"
                >
                  {field.value || ""}{" "}
                  {index + 1 !== game?.fields?.length ? "|" : ""}
                </p>
              ))}
            </div>
          ) : null}
          <div className="mt-2.5 flex items-center gap-6">
            <button
              type="button"
              className="text-[#B8B8B8] text-[12px] leading-[12px] font-inter flex items-center gap-2 cursor-pointer"
            >
              <WishListIcon className="" />
              Move to Wishlist
            </button>

            <button
              type="button"
              className="text-[#B8B8B8] text-[12px] leading-[12px] font-inter flex items-center gap-2 cursor-pointer"
            >
              <TrashIcon className="text-[#FF4659]" />
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <p className="text-[#ADEE68] text-[14px] leading-[14px] font-semibold font-poppins">
          {game?.offer_price}
        </p>
        <div className="bg-[#161616] border-[1.5px] border-[#3C3C3C] rounded-[44px] flex items-center gap-3.5 py-[3px] px-[5px]">
          <button
            onClick={() => handleQuantity("remove", game)}
            type="button"
            className="w-[28px] h-[28px] bg-[#5A5A5A] rounded-full flex justify-center items-center text-center text-white cursor-pointer"
          >
            <MinusIcon className="size-[12px]" />
          </button>
          <p className="text-[14px] leading-[21px] font-inter font-bold text-[#ECECEC]">
            {game?.quantity || 1}
          </p>
          <button
            onClick={() => handleQuantity("add", game)}
            type="button"
            className="w-[28px] h-[28px] bg-[#5A5A5A] rounded-full flex justify-center items-center text-white text-center cursor-pointer"
          >
            <PlusIcon className="size-[12px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
