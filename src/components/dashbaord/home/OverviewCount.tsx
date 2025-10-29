import React from "react";

interface Props {
  count: string;
  title: string;
}

const OverviewCount = ({ count, title }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="bg-[#161616] p-6 size-[60px] flex items-center justify-center rounded-[12px]">
        <p className="text-white-gradient text-[20px] leading-6 font-bold font-inter">
          {count}
        </p>
      </div>
      <h3 className="text-white-gradient text-[14px] leading-6 font-inter font-medium">
        {title}
      </h3>
    </div>
  );
};

export default OverviewCount;
