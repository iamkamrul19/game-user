import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  title: string;
  className?: string;
  isLoading?: boolean;
}

const DashboardTitle = ({ title, className, isLoading }: Props) => {
  return isLoading ? (
    <Skeleton className="w-[250px] h-[20px]" />
  ) : (
    <h1
      className={`text-white-gradient font-bold font-inter text-[26px] leading-[28px] ${className}`}
    >
      {title}
    </h1>
  );
};

export default DashboardTitle;
