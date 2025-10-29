"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Summary = ({ children, className, title = "Summary" }: Props) => {
  return (
    <div
      className={`w-full flex-1 bg-[#002814] rounded-[20px] p-5 ${className}`}
    >
      <h4 className="text-[21px] leading-7 text-white-gradient font-inter font-bold">
        {title}
      </h4>
      {children}
    </div>
  );
};

export default Summary;
