"use client";

import { useGetMyOrdersQuery } from "@/redux/api/orderApi";
import OrderCard from "./OrderCard";
import Pagination from "@/components/common/Pagination";
import useFilter from "@/hooks/useFilter";
import OrderCardSkeleton from "./OrderCardSkeleton";

const MyOrders = () => {
  const { page, limit, setPage } = useFilter();
  const { data, isLoading, isFetching } = useGetMyOrdersQuery({
    page,
    limit,
  });

  const dataList = data?.data?.data || [];
  const loading = isLoading || isFetching;
  return (
    <div className="mt-10">
      <h1 className="text-white-gradient text-[26px] leading-7 font-bold font-inter">
        My Orders
      </h1>
      <div className="flex flex-col gap-5 mt-10">
        {isLoading || isFetching
          ? Array.from({ length: 3 }).map((_, idx) => (
              <OrderCardSkeleton key={idx} />
            ))
          : dataList?.map((item) => (
              <OrderCard isLink={true} order={item} key={item.id} />
            ))}
      </div>

      {!loading && (
        <div className="flex justify-center items-center mt-10">
          <Pagination meta={data?.data?.meta} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default MyOrders;
