import React from "react";
import PaymentTitle from "./PaymentTitle";
import PaymentItems from "./PaymentItems";
import { CircleCheckIcon } from "lucide-react";

const ThankYou = () => {
  const handleHome = () => {
    window.location.href = "/dashboard/my-orders";
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <CircleCheckIcon className="fill-[#ADEE68]" />
        <PaymentTitle title="Purchase completed" />
      </div>
      <PaymentItems />
      <button
        type="button"
        onClick={handleHome}
        className="mt-6 cursor-pointer bg-white/10 py-3 px-3 rounded-[10px] text-white text-[14px] leading-[14px] font-medium font-poppins"
      >
        Go to my orders
      </button>
    </div>
  );
};

export default ThankYou;
