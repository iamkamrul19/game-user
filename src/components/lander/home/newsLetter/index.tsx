import NewsIcon from "@/components/icons/NewsIcon";
import React from "react";

const NewsLetter = () => {
  return (
    <section className="section bg-[#232323]">
      <div className="main-container flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <NewsIcon />
          <div className="max-w-[380px]">
            <h4 className="text-[23px] leading-[23px] font-semibold font-poppins text-white">
              Level up with our newsletter!
            </h4>
            <p className="text-[14px] leading-[23px] font-inter text-white/80 mt-2">
              Get exclusive game deals straight to your inbox. No spam, just
              pure gaming loot!
            </p>
          </div>
        </div>
        <div className="">
          <form className="bg-gradient-to-r from-[#F8C431] to-[#FF6400] rounded-[50px] p-[1.5px]">
            <div className="bg-[#161616] rounded-[50px] p-2 flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 placeholder:text-white/80 text-white/80 bg-transparent w-full focus:outline-none"
                required
              />
              <button
                type="submit"
                className="cursor-pointer bg-gradient-to-r from-[#F8C431] to-[#FF6400] px-6 py-2 rounded-[50px] text-[#01000E] text-[15px]  font-semibold leading-[22px] font-inter"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
