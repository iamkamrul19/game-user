"use client";

import SearchBox from "@/components/lander/search/SearchBox";
import BreadCrumbs from "@/components/common/breadcrumbs";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import InputGroup from "./InputGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLATFORM } from "@/enum";
import { SORT_DATA } from "./search.data";
import { DollarSignIcon } from "lucide-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useFilter from "@/hooks/useFilter";
import { useGetAllGamesQuery } from "@/redux/api/gameApi";
import GameCard from "@/components/common/GameCard";
import SectionTitle from "@/components/common/SectionTitle";
import debounce from "lodash.debounce";
import Pagination from "@/components/common/Pagination";
import NoData from "@/components/common/NoData";
import GameCardSkeleton from "@/components/common/GameCardSkeleton";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

const Search = () => {
  const [stock, setStock] = useState<boolean | undefined>(undefined);
  const [sortValue, setSortValue] = useState("");
  const {
    page,
    limit,
    search,
    setSearch,
    minPrice,
    maxPrice,
    setPage,
    range,
    setRange,
    clearRange,
  } = useFilter();
  const { data, isLoading, isFetching } = useGetAllGamesQuery(
    {
      page,
      limit,
      genre: search?.genre as string,
      min_price: minPrice,
      max_price: maxPrice,
      sortBy: search?.sortBy as string,
      sortOrder: search?.sortOrder as string,
      search: search?.search as string,
      platform: search?.platform as string,
      is_stock: stock,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleGenre = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setSearch({ ...search, genre: value });
  };

  const handleSort = (value: string) => {
    setSortValue(value);
    if (value === "all") {
      setSearch({ sortBy: "", sortOrder: "" });
    }
    if (value === "a_to_z") {
      setSearch({ ...search, sortBy: "title", sortOrder: "asc" });
    } else if (value === "z_to_a") {
      setSearch({ ...search, sortBy: "title", sortOrder: "desc" });
    } else if (value === "low_to_high") {
      setSearch({ ...search, sortBy: "price", sortOrder: "asc" });
    } else if (value === "high_to_low") {
      setSearch({ ...search, sortBy: "price", sortOrder: "desc" });
    }
  };

  const handleReset = () => {
    setPage(1);
    setSortValue("");
    setStock(undefined);
    setSearch({
      platform: "",
      genre: "",
      min_price: "",
      max_price: "",
      sortBy: "",
      orderBy: "",
      search: "",
      in_stock: "",
    });
  };

  const handleStock = () => {
    if (stock) {
      setStock(undefined);
    } else {
      setStock(true);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleGenre, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  const dataList = data?.data?.data || [];
  const loading = isLoading || isFetching;
  return (
    <section>
      <div className="main-container pt-[100px]">
        <BreadCrumbs links={["Search"]} />
        <div className="max-w-[80%] mx-auto">
          <div className="max-w-[50%] mx-auto">
            <div className="bg-gradient-to-l from-[#F8C431] to-[#FF6400] p-[1px] rounded-[12px]">
              <SearchBox
                className="w-full"
                onChange={(e) =>
                  setSearch({ ...search, search: e.target.value?.trim() })
                }
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 my-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <InputGroup label="Platform">
                <Select
                  value={search?.platform as string}
                  onValueChange={(value) =>
                    setSearch({
                      ...search,
                      platform: value === "all" ? "" : value,
                    })
                  }
                >
                  <SelectTrigger className="text-white/80 w-full border-white/20 font-poppins">
                    <SelectValue
                      placeholder="All"
                      className="text-white/80 font-poppins"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", ...Object.values(PLATFORM)]?.map((item) => (
                      <SelectItem
                        className="font-poppins"
                        key={item}
                        value={item?.toLowerCase()}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </InputGroup>

              <InputGroup label="Sort By">
                <Select value={sortValue} onValueChange={handleSort}>
                  <SelectTrigger className="text-white/80 w-full border-white/20">
                    <SelectValue placeholder="All" className="text-white/80" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_DATA?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </InputGroup>
              <InputGroup label="Genres">
                <input
                  onChange={debouncedResults}
                  type="search"
                  className="outline-none rounded-md placeholder:text-white/30 text-[14px] leading-[14px] px-2.5 py-[8px] text-white/80 border-[0.1px] border-white/20"
                  placeholder="genres"
                />
              </InputGroup>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-0">
              <HoverCard>
                <HoverCardTrigger className="border-[0.1px] border-white/20 px-4 py-2.5 rounded-md flex items-center gap-1 text-white/80 text-[14px] leading-[14px] font-poppins font-medium cursor-pointer">
                  <DollarSignIcon className="size-[15px]" />
                  Price
                </HoverCardTrigger>
                <HoverCardContent className="bg-[#303030F0] border-[0.1px] border-white/20">
                  <div>
                    <div></div>
                    <DualRangeSlider
                      label={
                        (value) => `$${value.toLocaleString()}` // format as currency
                      }
                      value={range}
                      onValueChange={setRange}
                      min={0}
                      max={1000}
                      step={1}
                      onClear={clearRange}
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>
              <div className="flex-1 hidden lg:flex justify-center items-center">
                <button
                  onClick={handleReset}
                  className="text-[#F8BB2C] text-[14px] leading-[14px] font-medium font-poppins underline cursor-pointer"
                  type="button"
                >
                  Reset all filters
                </button>
              </div>
              <button
                onClick={handleStock}
                type="button"
                className={`border-[0.1px] border-white/20 px-4 py-2.5 rounded-md flex items-center gap-1  text-[14px] leading-[14px] font-poppins font-medium cursor-pointer ${
                  stock ? "bg-white text-black" : "text-white/80"
                }`}
              >
                <IoMdCheckmarkCircleOutline className="size-[16px]" />
                In Stock
              </button>
              <div className="flex-1 flex justify-center items-center lg:hidden">
                <button
                  onClick={handleReset}
                  className="text-[#F8BB2C] text-[14px] leading-[14px] font-medium font-poppins underline cursor-pointer"
                  type="button"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#222222] to-[#161616] py-10">
        <div className="main-container">
          {loading ? (
            <div className="w-[120px] h-[20px] rounded-[6px] animate-pulse bg-white/20"></div>
          ) : (
            <SectionTitle
              showIcon={false}
              title={`${dataList?.length} items`}
            />
          )}
          {loading ? (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, index) => (
                <GameCardSkeleton key={index as number} />
              ))}
            </div>
          ) : dataList?.length ? (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {dataList?.map((item) => (
                <GameCard game={item} key={item.id} />
              ))}
            </div>
          ) : (
            <NoData />
          )}

          <div className="flex justify-center items-center mt-16">
            <Pagination meta={data?.data?.meta} setPage={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
