"use client";

import MoneyIcon from "@/components/icons/MoneyIcon";
import Link from "next/link";
import { FaFacebookF, FaDiscord, FaWhatsapp, FaTwitter } from "react-icons/fa";
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  total_saved: any;
}

const TotalSaved = ({ total_saved }: Props) => {
  return (
    <div className="bg-[#84489A] bg-opacity-30 p-7 rounded-[20px] ">
      <div className="flex items-center gap-3">
        <MoneyIcon className="text-[#D77BFF]" />
        <h1 className="text-white-gradient text-[18px] leading[28px] font-inter font-bold">
          Total Saved
        </h1>
      </div>
      <div className="flex flex-col items-center mt-9">
        <div className="bg-[#583663] rounded-[50px] py-[6px] px-[26px] w-fit">
          <p className="text-white text-[15px] leading-7 font-medium font-inter min-w-[100px] text-center">
            BDT{total_saved?.total_saved || "0.00"}
          </p>
        </div>
        <div className="mt-6">
          <p className="text-white/60 text-[12px] leading-[18px] font-inter font-medium">
            Share your score
          </p>
          <div className="flex items-center gap-3 mt-2.5">
            <Link href={""}>
              <FaWhatsapp className="size-[17px] text-white" />
            </Link>
            <Link href={""}>
              <FaTwitter className="size-[17px] text-white" />
            </Link>
            <Link href={""}>
              <FaFacebookF className="size-[17px] text-white" />
            </Link>
            <Link href={""}>
              <FaDiscord className="size-[17px] text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSaved;
