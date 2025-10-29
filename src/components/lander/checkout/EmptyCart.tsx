import WhiteCartIcon from "@/components/icons/WhiteCartIcon";
import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="w-full bg-[#232323] flex flex-col items-center rounded-[20px] p-10">
      <WhiteCartIcon />
      <h2 className="text-white-gradient text-[16px] leading-7 font-inter font-bold mt-10">
        Your cart is empty
      </h2>
      <p className="text-white/60 text-[12px] leading-[18px] font-inter">
        {`You didn't add any item in your cart yet. Browse the website to find
        amazing deals!`}
      </p>
      <Link
        className="mt-7 bg-[#161616] border-[1px] border-white/20 rounded-[50px] px-6 py-2.5 flex justify-center items-center text-white"
        href={"/"}
      >
        Back to shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
