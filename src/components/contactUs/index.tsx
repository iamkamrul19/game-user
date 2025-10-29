import React from "react";
import LanderNavbar1 from "../common/layout/navbar/LanderNavbar1";
import Image from "next/image";
import Button from "../ui/Button";

const ContactUs = () => {
  return (
    <div className="bg-[#161616] lg:h-screen">
      <LanderNavbar1 showOffer={false} />
      <div className="main-container pb-6 lg:pb-0 lg:pt-[180px] flex flex-col lg:flex-row lg:justify-between gap-10">
        <Image
          className="w-[400px] h-[460px] rounded-[26px]"
          src={"/contact-us.png"}
          height={500}
          width={500}
          alt="contact"
        />
        <div className="flex flex-col flex-1">
          <div>
            <h1 className="text-white-gradient text-[24px] leading-[28px] font-inter font-bold">
              Contact with Us
            </h1>
            <p className="text-[#CCCCCC] text-[12px] leading-[15px] font-medium font-inter mt-2.5">
              9 AM to 12 PM available
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <input
                className="bg-[#232323] border-[1px] border-white/20 py-2.5 px-6 rounded-[14px] flex-1 text-[#CACACA]"
                type="text"
                placeholder="First name"
              />
              <input
                className="bg-[#232323] border-[1px] border-white/20 py-2.5 px-6 rounded-[14px] flex-1 text-[#CACACA]"
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              className="bg-[#232323] border-[1px] border-white/20 py-2.5 px-6 rounded-[14px] flex-1 text-[#CACACA]"
              type="text"
              placeholder="Your email"
            />
            <input
              className="bg-[#232323] border-[1px] border-white/20 py-2.5 px-6 rounded-[14px] flex-1 text-[#CACACA]"
              type="text"
              placeholder="Phone number"
            />
            <textarea
              rows={4}
              className="bg-[#232323] border-[1px] border-white/20 py-2.5 px-6 rounded-[14px] flex-1 text-[#CACACA]"
              name=""
              id=""
              placeholder="Write your message"
            ></textarea>
            <div className="">
              <Button
                variant="yellow"
                className="bg-[#161616] rounded-[50px]"
                parentClassName="w-fit max-w-[220px] rounded-[50px]"
              >
                Submit Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
