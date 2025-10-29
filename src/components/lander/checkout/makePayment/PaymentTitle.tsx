import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  title: string;
  className?: string;
}

const PaymentTitle = ({ title, className }: Props) => {
  return (
    <h4
      className={twMerge(
        "text-[20px] leading-7 font-inter font-bold text-[#ADEE68]",
        className
      )}
    >
      {title}
    </h4>
  );
};

export default PaymentTitle;
