"use client";

import React, { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RiErrorWarningLine } from "react-icons/ri";
import Image from "next/image";
import ErrorMessage from "@/components/common/ErrorMessage";

interface Props {
  label: string;
  children: ReactNode;
  content?: string;
  className?: string;
  error?: string;
}
const FieldControl = ({
  label,
  content,
  children,
  className,
  error,
}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor=""
        className="text-[13px] leading-[13px] text-white font-inter font-semibold capitalize"
      >
        {label}
      </label>
      <div
        className={`bg-white/10 border-[1px] border-white/20 rounded-[8px] px-4 py-2 text-[#AAAAAA] relative ${className}`}
      >
        {children}
        {content ? (
          <HoverCard>
            <HoverCardTrigger className="absolute right-4 top-[30%]">
              <RiErrorWarningLine className="size-[16px]" />
            </HoverCardTrigger>
            <HoverCardContent className="w-[250px]">
              <Image
                className="w-full h-full"
                src={content}
                height={80}
                width={120}
                alt=""
              />
            </HoverCardContent>
          </HoverCard>
        ) : null}
      </div>
      <ErrorMessage msg={error} className="!text-[10px] !mt-0 !p-0" />
    </div>
  );
};

export default FieldControl;
