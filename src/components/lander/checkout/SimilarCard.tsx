import ShoppingIcon from "@/components/icons/ShoppingIcon";
import { setCheckoutGame } from "@/redux/slice/checkoutSlice";
import { IGame } from "@/types";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface Props {
  item: IGame;
}

const SimilarCard = ({ item }: Props) => {
  const dispatch = useDispatch();
  const handleClick = (item: IGame) => {
    if (item?.need_user_info?.is_required) {
    } else {
      dispatch(
        setCheckoutGame({
          action: "add",
          data: {
            id: item.id,
            from_offer: false,
            fields: [],
            image_url: item?.images[0],
            offer_price: item?.offer_price,
            platform: item.platform,
            price: item.price,
            quantity: 1,
            title: item.title,
          },
        })
      );
    }
  };
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-[100px] h-[69px] overflow-hidden rounded-[5px] border-[1px] border-white/20">
          <Image
            className="w-full h-fit object-center object-cover"
            src={item?.images[0]}
            height={69}
            width={110}
            alt=""
          />
        </div>
        <div>
          <p className="text-[#787878] text-[10px] leading-[10px] font-inter">
            {item?.platform || ""}
          </p>
          <h4 className="text-[14px] leading-[14px] font-poppins font-semibold text-white mt-2">
            {item?.title || ""}
          </h4>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <p className="text-[#ADEE68] text-[14px] leading-[14px] font-poppins font-semibold">
          TK{item?.offer_price || ""}
        </p>
        <button
          onClick={() => handleClick(item)}
          type="button"
          className="bg-[#161616] border-[1px] border-[#3C3C3C] py-2.5 px-4 rounded-[50px] text-[12px] text-[#B8B8B8] font-inter leading-[18px] flex justify-between items-center gap-2 cursor-pointer"
        >
          <ShoppingIcon />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SimilarCard;
