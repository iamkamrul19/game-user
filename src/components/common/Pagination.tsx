"use client";

import { IPagination } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface Props {
  meta: IPagination | undefined;
  setPage: (page: number) => void;
  className?: string;
}

const Pagination = ({ meta, setPage, className }: Props) => {
  if (!meta) return null;

  const { page, total_pages } = meta;

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (total_pages <= 7) {
      for (let i = 1; i <= total_pages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(total_pages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < total_pages - 2) pages.push("...");
      pages.push(total_pages);
    }

    return pages;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 disabled:opacity-50 text-[#9CA3AF] cursor-pointer disabled:cursor-auto"
      >
        <ChevronRightIcon className="rotate-180 w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPages().map((item, idx) =>
          item === "..." ? (
            <span key={idx} className="px-2 text-[#9CA3AF]">
              ...
            </span>
          ) : (
            <button
              key={idx}
              type="button"
              onClick={() => setPage(Number(item))}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-[#9CA3AF] cursor-pointer text-[16px] font-poppins font-bold leading-[26px]
                ${
                  page === item
                    ? "bg-[#9366FE] text-white"
                    : "hover:bg-gray-700"
                }
              `}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => setPage(Math.min(total_pages, page + 1))}
        disabled={page === total_pages}
        className="p-2 disabled:opacity-50 text-[#9CA3AF] cursor-pointer disabled:cursor-auto"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
