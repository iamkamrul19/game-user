import { CircleX } from "lucide-react";
import React from "react";
import PaymentTitle from "./PaymentTitle";
import PaymentItems from "./PaymentItems";

const PaymentFailed = () => {
  const handleHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <CircleX className="fill-[#FF6400]" />
        <PaymentTitle title="Payment failed" className="text-[#FF6400]" />
      </div>
      <PaymentItems />
      <button
        type="button"
        onClick={handleHome}
        className="mt-6 cursor-pointer bg-white/10 py-3 px-3 rounded-[10px] text-white text-[14px] leading-[14px] font-medium font-poppins"
      >
        Back to home
      </button>
    </div>
  );
};

export default PaymentFailed;
