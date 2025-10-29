"use client";

import { useAppSelector } from "@/redux/hooks";
import { formatToReadableDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Progress } from "../ui/progress";
const DashboardHero = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="">
      <div
        className="lg:h-[180px] rounded-[20px] flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 px-6 lg:px-10 py-5 lg-py-8"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(42, 0, 140, 1) 0%, rgba(51, 0, 173, 0.6) 100%), url('/dashboard-bg.png')`,
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="size-[48px] lg:size-[72px] rounded-full bg-white border-[1px] border-white overflow-hidden">
              {user?.profile_picture ? (
                <Image
                  className="w-full h-full object-center object-cover"
                  src={user?.profile_picture || ""}
                  height={72}
                  width={72}
                  alt="profile-image"
                />
              ) : null}
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-white to-[#C0A6FF] bg-clip-text text-transparent text-[20px] leading-[20px] lg:text-[27px] lg:leading-[28px] font-bold font-inter">
                {user?.full_name || ""}
              </h1>
              <p className="text-[14px] leading-[28px] font-inter font-medium text-white">
                Member since: {formatToReadableDate(user?.createdAt || "")}
              </p>
            </div>
          </div>
          <div>
            <p className="text-white text-[14px] leading-[28px] font-black font-inter">
              {`Level ${(user && user?.level > 0) || 0}`}
            </p>
            <Progress
              value={user?.level}
              className="w-[100px] h-[9px] bg-white/40 [&>div]:h-[9px] [&>div]:bg-[#ADEE68] [&>div]:rounded-[50px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {user?.social_links?.twitter && (
            <Link
              className="size-[40px] lg:size-[44px] rounded-full bg-[#00000052] border-[1px] border-[#FFFFFF61] flex justify-center items-center text-white"
              href={user?.social_links?.twitter}
            >
              <FaXTwitter />
            </Link>
          )}
          {user?.social_links?.facebook && (
            <Link
              className="size-[40px] lg:size-[44px] rounded-full bg-[#00000052] border-[1px] border-[#FFFFFF61] flex justify-center items-center text-white"
              href={user?.social_links?.facebook}
            >
              <FaFacebookF />
            </Link>
          )}
          {user?.social_links?.instagram && (
            <Link
              className="size-[40px] lg:size-[44px] rounded-full bg-[#00000052] border-[1px] border-[#FFFFFF61] flex justify-center items-center text-white"
              href={user?.social_links?.instagram}
            >
              <FaInstagram className="size-[20px]" />
            </Link>
          )}
          {user?.social_links?.linkedin && (
            <Link
              className="size-[40px] lg:size-[44px] rounded-full bg-[#00000052] border-[1px] border-[#FFFFFF61] flex justify-center items-center text-white"
              href={user?.social_links?.linkedin}
            >
              <FaLinkedinIn className="size-[18px]" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
