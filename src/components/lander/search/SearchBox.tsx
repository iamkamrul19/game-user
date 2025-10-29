"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import debouce from "lodash.debounce";
import { useEffect, useMemo } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ className, onChange, ...rest }: Props) => {
  const debouncedResults = useMemo(() => {
    return debouce(onChange, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <div className="flex items-center gap-[10px] h-full bg-[#161616] px-[14px] py-[8px] rounded-[10px]">
      <SearchIcon className="text-white size-[14px]" />
      <input
        type="search"
        onChange={debouncedResults}
        {...rest}
        className={`text-[#B7B7B7] text-[12px] placeholder:text-white outline-none bg-transparent ${className}`}
      />
    </div>
  );
};

export default SearchBox;
