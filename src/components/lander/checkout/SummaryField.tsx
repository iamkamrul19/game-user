import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {
  title: string;
  value: number | string;
  className?: string;
  isLoading?: boolean;
}

const SummaryField = ({ title, value, className, isLoading }: Props) => {
  return (
    <div
      className={`flex justify-between items-center text-[#B8B8B8] text-[15px] leading-7 font-inter font-medium ${className}`}
    >
      <p>{title}</p>
      {isLoading ? <Skeleton className="w-[48px] h-[20px]" /> : <p>{value}</p>}
    </div>
  );
};

export default SummaryField;
