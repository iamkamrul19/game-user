import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const SupportCard = ({ item }: Props) => {
  return (
    <div className="flex-1 bg-white/5 backdrop-blur-[30px] border-[1px] border-white/10 rounded-[16px] px-6 py-7 min-h-[195px]">
      <p className="flex justify-center">{item.icon}</p>
      <h1 className="text-[15px] leading-[15px] font-semibold font-poppins text-white text-center mt-4">
        {item.title}
      </h1>
      <p className="text-[12px] leading-[18px] font-inter text-white/80 mt-3 text-center">
        {item?.description}
      </p>
    </div>
  );
};

export default SupportCard;
