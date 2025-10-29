import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}
const WhyGGCard = ({ item }: Props) => {
  return (
    <div>
      <span className="text-[#F8C431]">{item?.icon}</span>
      <h4 className="text-[16px] font-semibold leading-[16px] mt-[22px]">
        {item?.title}
      </h4>
      <p className="text-[12px] font-medium leading-[12px] text-[#FFFFFFB2] mt-[8px] font-inter">
        {item?.description}
      </p>
    </div>
  );
};

export default WhyGGCard;
