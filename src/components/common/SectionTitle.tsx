import React from "react";
import ChevronIcon from "../icons/ChevronIcon";

interface Props {
  title: string;
  className?: string;
  showIcon: boolean;
}

const SectionTitle = ({ title, className, showIcon = true }: Props) => {
  return (
    <h3
      className={`text-[30px] leading-[30px] font-poppins font-bold text-white flex items-center gap-3 ${className}`}
    >
      {title}
      {showIcon && <ChevronIcon />}
    </h3>
  );
};

export default SectionTitle;
