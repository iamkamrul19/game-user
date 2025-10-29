import React from "react";

const Badge = ({ title }: { title: string }) => {
  return (
    <span className=" bg-[#ADEE68] py-[3px] px-[9px] text-[12px] font-semibold font-inter text-[#01000E] rounded-[37px]">
      {title}
    </span>
  );
};

export default Badge;
