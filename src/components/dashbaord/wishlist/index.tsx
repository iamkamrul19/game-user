"use client";

import useFilter from "@/hooks/useFilter";
import { useGetPaginationWishListQuery } from "@/redux/api/wishListApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GameCard from "@/components/common/GameCard";
import Pagination from "@/components/common/Pagination";
import GameCardSkeleton from "@/components/common/GameCardSkeleton";
import DashboardTitle from "../DashboardTitle";
const WishList = () => {
  const { page, limit, setPage, search, setSearch } = useFilter();
  const { data, isLoading, isFetching } = useGetPaginationWishListQuery({
    page,
    limit,
    sortBy: search?.sortBy as string,
    sortOrder: search?.sortOrder as string,
  });

  const handleFilter = (value: string) => {
    if (value === "all") {
      setSearch({ sortBy: "", sortOrder: "" });
    } else if (value === "low_to_high") {
      setSearch({ sortBy: "price", sortOrder: "asc" });
    } else if (value === "high_to_low") {
      setSearch({ sortBy: "price", sortOrder: "desc" });
    } else {
      setSearch({ sortBy: "", sortOrder: "" });
    }
  };
  const dataList = data?.data?.data || [];
  const loading = isFetching || isLoading;
  return (
    <div className="mt-12">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
        <DashboardTitle
          title={`${data?.data?.meta?.total} Games in wishlist`}
          isLoading={loading}
        />

        <div className="flex items-center gap-3">
          <p className="text-white/75 text-[12px] leading-[18px] font-inter font-semibold">
            Sort by:
          </p>
          <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[170px] text-white border-none">
              <SelectValue placeholder="Select here.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low_to_high">Price - low to high</SelectItem>
              <SelectItem value="high_to_low">Price = high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))
          : dataList?.map((item) => <GameCard game={item} key={item?.id} />)}
      </div>

      {!loading && (
        <div className="flex justify-center items-center mt-10">
          <Pagination meta={data?.data?.meta} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default WishList;
