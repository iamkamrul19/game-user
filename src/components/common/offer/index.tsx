"use client";

import ChevronIcon from "@/components/icons/ChevronIcon";
import useMediaQuery from "@/hooks/useMediaQuery";
import { IOffer } from "@/types";

import Link from "next/link";
interface Props {
  offer: IOffer;
}
const Offer = ({ offer }: Props) => {
  const isMobile = useMediaQuery("(max-width: 376px)");

  return (
    <section
      className="h-[54px] lg:h-[64px] bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url('${
          isMobile ? offer?.image_mobile : offer?.image_desktop
        }')`,
      }}
    >
      <Link
        href={offer?.button_link}
        className="absolute right-[24px] lg:right-[100px] top-[25%] lg:top-[20%] flex items-center gap-2 bg-black/15 border-[1px] border-white/65 py-[6px] lg:py-[8px] px-[12px] lg:px-[21px] rounded-[8px] lg:rounded-[10px] text-[12px] lg:text-[15px] leading-[16px] lg:leading-[23px] font-medium text-white font-inter"
      >
        View details{" "}
        <ChevronIcon className="text-white size-[10px] lg:size-[14px]" />
      </Link>
    </section>
  );
};

export default Offer;

{
  /* <section className="bg-gradient-to-r from-[#8552FE] via-[#5A24D8] to-[#773198] px-6 lg:px-[103px] py-4">
      <div className="flex justify-between items-center">
        <Image
          src={offer?.image_desktop}
          height={60}
          width={150}
          alt="offer-image"
        />
        <Link
          href={offer?.button_link}
          className="flex items-center gap-2 bg-black/15 border-[1px] border-white/65 py-[8px] px-[21px] rounded-[10px] text-[15px] leading-[23px] font-medium text-white font-inter"
        >
          View details <ChevronIcon className="text-white size-[16px]" />
        </Link>
      </div>
    </section> */
}
