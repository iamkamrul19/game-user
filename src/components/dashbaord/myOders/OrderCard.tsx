import { IOrder } from "@/types";
import { formatToReadableDate } from "@/utils";
import Link from "next/link";
import React from "react";

interface Props {
  order: IOrder;
  isLink: boolean;
}

const OrderCard = ({ order, isLink }: Props) => {
  return (
    <Link
      href={` ${
        isLink ? `/dashboard/my-orders/order-details/${order.id}` : "#"
      }`}
      className={`bg-gradient-to-b from-[#5B5B5B]/40 to-[#393939]/30 rounded-[20px] px-7 py-5 min-h-[112px] flex justify-between items-center ${
        !isLink && "cursor-default"
      }`}
    >
      <div></div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-10">
        <div className="flex items-center">
          <div className="text-[10px] leading-[15px] text-white/80 font-inter pr-5 border-r border-r-white/20">
            <p>Order</p>
            <p className="font-semibold mt-1.5">{order?.id}</p>
          </div>
          <div className="text-[10px] leading-[15px] text-white/80 font-inter px-5 border-r border-r-white/20">
            <p>Time</p>
            <p className="font-semibold mt-1.5">
              {formatToReadableDate(order?.createdAt)}
            </p>
          </div>
          <div className="hidden lg:block text-[10px] leading-[15px] text-white/80 font-inter px-5">
            <p>Order Status</p>
            <p
              className={`font-semibold backdrop-blur-[10px] rounded-[20px] py-[2px] px-[9px] mt-1.5 ${
                order?.status === "completed" ? "bg-[#006F43]" : "bg-[#905500]"
              }`}
            >
              {order?.status}
            </p>
          </div>
        </div>
        <div className="w-full lg:min-w-[160px] flex flex-col gap-2">
          <div className="text-[10px] leading-[15px] text-white/80 font-inter flex justify-between items-center">
            <p>Price:</p>
            <p className="font-semibold">Tk {order?.official_price}</p>
          </div>
          <div className="text-[10px] leading-[15px] text-white/80 font-inter flex justify-between items-center">
            <p>Tax ({order?.vat_percentage?.toFixed(2)}%)</p>
            <p className="font-semibold">Tk {order?.official_price}</p>
          </div>
          <div className="text-[10px] leading-[15px] text-white/80 font-inter flex justify-between items-center">
            <p>Total</p>
            <p className="text-[16px] leading-[24px] text-[#ADEE68] font-bold">
              Tk {order?.official_price}
            </p>
          </div>
        </div>
        <div className=" lg:hidden -mt-5 text-[10px] leading-[15px] text-white/80 font-inter">
          <p>Order Status</p>
          <p
            className={`font-semibold backdrop-blur-[10px] rounded-[20px] py-[2px] px-[9px] mt-1.5 w-fit ${
              order?.status === "completed" ? "bg-[#006F43]" : "bg-[#905500]"
            }`}
          >
            {order?.status}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
