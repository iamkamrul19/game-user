import { ArrowRight } from "lucide-react";
import React from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const CommonService = ({ item }: Props) => {
  return (
    <div className="flex-1 bg-white/5 backdrop-blur-[30px] border-[1px] border-white/10 rounded-[16px] px-6 py-[17px] flex items-center gap-4 text-[12px] leading-[12px] font-semibold font-poppins text-white cursor-pointer ">
      {item.icon}
      {item.title}
      <ArrowRight className="ml-auto text-white/40 -rotate-45 size-[16px]" />
    </div>
  );
};

export default CommonService;
