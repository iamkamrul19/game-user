"use client";

import Image from "next/image";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiOutlineTrash } from "react-icons/hi2";
import { ICheckoutGame } from "@/types";
import { calculateDiscount } from "@/utils";
import { useDispatch } from "react-redux";
import { removeCheckoutGame } from "@/redux/slice/checkoutSlice";
const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
  game: ICheckoutGame;
}

const SingleCart = ({ game }: Props) => {
  const dispatch = useDispatch();

  const handleRemove = (item: ICheckoutGame) => {
    dispatch(removeCheckoutGame(item));
  };

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="h-[50px] w-[76px] rounded-[10px] border-[1px] border-white/50 overflow-hidden">
          {/* "/collection-bg.png" */}
          <Image
            className="w-full h-fit object-cover object-center"
            src={game?.image_url || ""}
            height={50}
            width={76}
            alt="cart"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[11px] leading-[11px] font-poppins font-semibold text-white truncate max-w-[150px] truncate">
            {game?.title || ""}
          </h1>
          <p className="text-[#BDBDBD] text-[10px] leading-[10px] font-poppins">
            {game?.platform || ""}
          </p>
          <div className="flex items-center gap-3">
            <p className="text-[#ADEE68] text-[13px] font-poppins font-semibold capitalize">
              {game?.price}
            </p>
            <p className="text-[8px] font-lexend font-medium leading-[12px] text-white bg-[#5D5D5D75] py-[3px] px-[7px] rounded-[12px] flex justify-center items-center max-w-[55px]">
              {calculateDiscount(game?.price, game?.offer_price)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Select value={"" + game?.quantity}>
          <SelectTrigger className="text-white border-[0.5px] border-[#FFFFFF38]">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            {QUANTITIES?.map((item) => (
              <SelectItem value={"" + item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          onClick={() => handleRemove(game)}
          type="button"
          className="text-[#A6A6A6] cursor-pointer"
        >
          <HiOutlineTrash />
        </button>
      </div>
    </div>
  );
};

export default SingleCart;
