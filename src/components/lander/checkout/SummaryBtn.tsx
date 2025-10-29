import React, { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  className?: string;
  title: string;
}

const SummaryBtn = ({ className, title, ...rest }: Props) => {
  return (
    <button
      className={`w-full bg-[#00803F] disabled:bg-[#00803F]/40 disabled:text-white/50 rounded-[50px] text-white px-6 py-2.5 flex justify-center items-center cursor-pointer disabled:cursor-auto text-[14px] leading-5 font-semibold font-inter ${className}`}
      {...rest}
    >
      {title}
    </button>
  );
};

export default SummaryBtn;
