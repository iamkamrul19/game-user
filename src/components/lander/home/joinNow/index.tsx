import { IJoinNow } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  joinNow: IJoinNow;
}

const JoinNow = ({ joinNow }: Props) => {
  return (
    <section
      className="bg-no-repeat bg-cover bg-center section"
      style={{
        backgroundImage: "url('/join-now-bg.png')",
      }}
    >
      <div className="main-container flex flex-col lg:flex-row items-center gap-10">
        <div>
          {joinNow?.mockup_image && (
            <Image
              src={joinNow?.mockup_image || ""}
              height={470}
              width={605}
              alt="join-now"
            />
          )}
        </div>
        <div className="lg:max-w-[460px]">
          <h3 className="text-[30px] font-bold leading-[30px] text-white lg:max-w-[380px] font-poppins">
            {joinNow?.title}
          </h3>
          <p className="text-[14px] leading-[23px] font-inter text-white/80 mt-[22px]">
            {joinNow?.description}
          </p>
          <div className="ml-4">
            <Link
              className="relative mt-9 flex bg-[#2C3CC9] py-[14px] px-[60px] text-white font-poppins text-[18px] leading-[18px] font-semibold items-center gap-2 text-wrap w-fit"
              href={`${joinNow?.buttonLink}`}
            >
              {joinNow?.icon && <i className={`${joinNow?.icon}`} />}
              {joinNow?.buttonText}
              <span className="absolute -top-[15px] -right-[15px] size-[15px] bg-[#3535A4]"></span>
              <span className="absolute -top-[15px] -left-[15px] size-[15px] bg-[#3535A4]"></span>
              <span className="absolute -bottom-[15px] -left-[15px] size-[15px] bg-[#3535A4]"></span>
              <span className="absolute -bottom-[15px] -right-[15px] size-[15px] bg-[#3535A4]"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNow;
