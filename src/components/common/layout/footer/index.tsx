"use client";

import React from "react";
import { FOOTER_LINKS, PAYMENT_GATEWAYS } from "./footer.data";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import FacebookIcon from "@/components/icons/FacebookIcon";
import InstaIcon from "@/components/icons/InstaIcon";
import XIcon from "@/components/icons/XIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import DiscordIcon from "@/components/icons/DiscordIcon";
import YTIcon from "@/components/icons/YTIcon";

const Footer = () => {
  const { socialLinks } = useAppSelector((state) => state.settings);
  return (
    <footer className="font-inter lg:pt-[90px] lg:pb-[60px]">
      <nav className="main-container">
        <div className="flex lg:items-center flex-col lg:flex-row gap-4 lg:gap-10">
          <h2 className="text-white font-semibold text-[18px] leading-[24px] font-inter">
            Payment By:
          </h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-3">
            {PAYMENT_GATEWAYS?.map((item) => (
              <Image
                className="w-[80px] h-[60px]"
                key={item}
                src={item}
                height={50}
                width={100}
                alt="payment-image"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-12 mt-[60px]">
          <div>
            <Link href={"/"}>
              <Image
                className="w-[165px] h-[45px]"
                src={"/gg-logo.svg"}
                height={45}
                width={180}
                alt="gg-logo"
              />
            </Link>
            <h3 className="mt-4 lg:mt-8 text-[14px] leading-[21px] text-[#D0D3E2] max-w-[250px]">
              Offering a variety of genres that cater to all tastes
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {FOOTER_LINKS.map((footer) => (
              <div
                key={footer.title}
                className="flex flex-col gap-2.5 lg:gap-4"
              >
                <FooterTitle title={footer.title} />
                {footer.items.map((link) => (
                  <Link
                    key={link.link}
                    href={link.link}
                    className="text-[#D0D3E2] font-inter text-[14px] leading-[21px]"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 mt-10">
          <div className="flex items-center gap-3">
            <Link href={socialLinks?.facebook || ""}>
              <FacebookIcon />
            </Link>
            <Link href={socialLinks?.instagram || ""}>
              <InstaIcon />
            </Link>
            <Link href={socialLinks?.twitter || ""}>
              <XIcon />
            </Link>
            <Link href={socialLinks?.telegram || ""}>
              <TelegramIcon />
            </Link>
            <Link href={socialLinks?.discord || ""}>
              <DiscordIcon />
            </Link>
            <Link href={socialLinks?.youtube || ""}>
              <YTIcon />
            </Link>
          </div>
          <span className="text-[#D0D3E2A3] text-[14px] leading-[21px] text-center">
            Copyright © 2025 GG subscriptions - All rights reserved
          </span>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

const FooterTitle = ({ title }: { title: string }) => {
  return (
    <h4 className="font-poppins font-bold text-[16px] text-white">{title}</h4>
  );
};
